const LOCAL_STORAGE_KEY = import.meta.env.VITE_LOCAL_STORAGE_KEY

// Base64 dönüşüm fonksiyonları
const arrayBufferToBase64 = (buffer: ArrayBuffer) =>
    btoa(String.fromCharCode(...new Uint8Array(buffer)))

const base64ToArrayBuffer = (base64: string) => {
    const binaryString = atob(base64)
    const len = binaryString.length
    const bytes = new Uint8Array(len)
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i)
    }
    return bytes.buffer
}

// Rastgele AES anahtarı oluşturma
async function getKey() {
    // Anahtarın doğru uzunlukta olduğundan emin olma (32 byte = 256 bit)
    const keyMaterial = new TextEncoder().encode(LOCAL_STORAGE_KEY)
    const hashBuffer = await crypto.subtle.digest('SHA-256', keyMaterial)
    
    return crypto.subtle.importKey(
        'raw',
        hashBuffer,
        { name: 'AES-GCM' },
        false,
        ['encrypt', 'decrypt']
    )
}

// Şifreleme
async function encryptToken(token: string) {
    const key = await getKey()
    const iv = crypto.getRandomValues(new Uint8Array(12)) // Rastgele IV oluştur
    const encryptedData = await crypto.subtle.encrypt(
        { name: 'AES-GCM', iv },
        key,
        new TextEncoder().encode(token)
    )

    // IV ve şifreli veriyi birlikte saklıyoruz (JSON formatında)
    return JSON.stringify({
        iv: arrayBufferToBase64(iv),
        data: arrayBufferToBase64(encryptedData),
    })
}

// Deşifreleme
async function decryptToken(encryptedString: string) {
    const key = await getKey()
    const encryptedObj = JSON.parse(encryptedString)
    const iv = base64ToArrayBuffer(encryptedObj.iv)
    const encryptedData = base64ToArrayBuffer(encryptedObj.data)

    const decryptedData = await crypto.subtle.decrypt(
        { name: 'AES-GCM', iv: iv },
        key,
        encryptedData
    )

    return new TextDecoder().decode(decryptedData)
}

// Token alma
export const getCRMToken = async () => {
    const token = localStorage.getItem("django-crm-token")
    if (!token) return null
    let decryptedToken = await decryptToken(token)
    return JSON.parse(decryptedToken)
}

// Token kaydetme
export const setCRMToken = async (token: string) => {
    let tokenString = JSON.stringify(token)
    const encryptedToken = await encryptToken(tokenString)
    localStorage.setItem("django-crm-token", encryptedToken)
}

// Token silme
export const removeCRMToken = () => {
    localStorage.removeItem("django-crm-token")
}

