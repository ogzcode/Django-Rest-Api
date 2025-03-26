<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { useForm } from 'vee-validate'
import { Button } from '@/components/ui/button'
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'
import { login } from '@/services/request/auth'
import { toast } from 'vue-sonner'
import { setCRMToken } from '@/config/tokenConfig'

const schema = toTypedSchema(z.object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    password: z.string().min(6, "Password must be at least 6 characters"),
}))

const { handleSubmit } = useForm({
    validationSchema: schema,
})

const onSubmit = handleSubmit(async (values) => {
    try {
        const response = await login(values)
        console.log(response.data)
        setCRMToken(response.data)
        toast.success("Login successful")
        window.location.reload()
    } catch (error: any) {
        console.log(error)
        toast.error(error.response?.data?.detail || "Giriş işlemi başarısız oldu")
    }
})
</script>

<template>
    <div class="flex flex-col items-center justify-center h-screen">
        <Card class="w-96 p-4">
            <CardHeader>
                <CardTitle class="text-2xl font-bold text-zinc-700">Login</CardTitle>
                <CardDescription class="text-zinc-600 font-normal">Enter your email and password to login
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form @submit="onSubmit" class="flex flex-col gap-4">
                    <FormField v-slot="{ componentField }" name="username">
                        <FormItem>
                            <FormLabel class="text-zinc-600 font-normal">Username</FormLabel>
                            <FormControl>
                                <Input type="text" placeholder="Username" v-bind="componentField" />
                            </FormControl>
                            <FormMessage class="text-xs" />
                        </FormItem>
                    </FormField>
                    <FormField v-slot="{ componentField }" name="password">
                        <FormItem>
                            <FormLabel class="text-zinc-600 font-normal">Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="Password" v-bind="componentField" />
                            </FormControl>
                            <FormMessage class="text-xs" />
                        </FormItem>
                    </FormField>
                    <Button type="submit" class="text-white mt-2">Login</Button>
                </form>
                <div class="flex justify-center gap-2 mt-6 text-sm">
                    <p class="text-zinc-500 font-normal">Don't have an account?</p>
                    <RouterLink to="/register" class="text-rose-500 font-medium tracking-wide hover:text-rose-600">
                        Register</RouterLink>
                </div>
            </CardContent>
        </Card>
    </div>
</template>
