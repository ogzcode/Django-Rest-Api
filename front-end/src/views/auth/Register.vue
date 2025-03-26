<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Stepper, StepperDescription, StepperItem, StepperSeparator, StepperTitle, StepperTrigger } from '@/components/ui/stepper'
import { toTypedSchema } from '@vee-validate/zod'
import { Check, Circle, Dot, ArrowRight, ArrowLeft } from 'lucide-vue-next'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'
import { ref } from 'vue'
import * as z from 'zod'
import { useRouter } from 'vue-router'
import { register } from '@/services/request/auth'
import { toast } from 'vue-sonner'

const router = useRouter()

const formSchema = [
    z.object({
        username: z.string(),
        email: z.string().email(),
        password: z.string().min(2).max(50),
    }),
    z.object({
        name: z.string(),
        tax_number: z.string(),
        company_email: z.string().email(),
    })
]

const stepIndex = ref(1)
const steps = [
    {
        step: 1,
        title: 'User Details',
        description: 'Provide your information',
    },
    {
        step: 2,
        title: 'Company Details',
        description: 'Provide your company details',
    },
]

async function onSubmit(values: any) {
    try {
        const data = {
            username: values.username,
            email: values.email,
            password: values.password,
            company: {
                name: values.name,
                tax_number: values.tax_number,
                email: values.company_email,
            }
        }
        const response = await register(data)
        toast.success(response.data.message)
        router.push('/login')
    } catch (error: any) {
        toast.error(error.response.data.message)
    }
}
</script>

<template>
    <div class="flex flex-col items-center justify-center h-screen">
        <Card class="w-[480px] p-4">
            <CardHeader>
                <CardTitle class="text-2xl font-bold text-zinc-700">Register</CardTitle>
                <CardDescription class="text-zinc-600 font-normal">Create an account to get started</CardDescription>
            </CardHeader>
            <CardContent>
                <Form v-slot="{ meta, values, validate }" as="" keep-values
                    :validation-schema="toTypedSchema(formSchema[stepIndex - 1])">
                    <Stepper v-slot="{ isNextDisabled, isPrevDisabled, nextStep, prevStep }" v-model="stepIndex"
                        class="block w-full">
                        <form @submit="(e) => {
                            e.preventDefault()
                            validate()

                            if (stepIndex === steps.length && meta.valid) {
                                onSubmit(values)
                            }
                        }">
                            <div class="flex w-full flex-start gap-2">
                                <StepperItem v-for="step in steps" :key="step.step" v-slot="{ state }"
                                    class="relative flex w-full flex-col items-center justify-center" :step="step.step">
                                    <StepperSeparator v-if="step.step !== steps[steps.length - 1].step"
                                        class="absolute left-[calc(50%+20px)] right-[calc(-50%+10px)] top-5 block h-0.5 shrink-0 rounded-full bg-muted group-data-[state=completed]:bg-primary" />

                                    <StepperTrigger as-child>
                                        <Button
                                            :variant="state === 'completed' || state === 'active' ? 'default' : 'outline'"
                                            size="icon" class="z-10 rounded-full shrink-0"
                                            :class="[state === 'active' && 'ring-2 ring-ring ring-offset-2 ring-offset-background']"
                                            :disabled="state !== 'completed' && !meta.valid">
                                            <Check v-if="state === 'completed'" class="size-5" />
                                            <Circle v-if="state === 'active'" />
                                            <Dot v-if="state === 'inactive'" />
                                        </Button>
                                    </StepperTrigger>

                                    <div class="mt-5 flex flex-col items-center text-center">
                                        <StepperTitle :class="[state === 'active' && 'text-primary']"
                                            class="text-sm font-semibold transition lg:text-base">
                                            {{ step.title }}
                                        </StepperTitle>
                                        <StepperDescription :class="[state === 'active' && 'text-primary']"
                                            class="sr-only text-xs text-muted-foreground transition md:not-sr-only lg:text-sm">
                                            {{ step.description }}
                                        </StepperDescription>
                                    </div>
                                </StepperItem>
                            </div>

                            <div class="flex flex-col gap-4 mt-4">
                                <template v-if="stepIndex === 1">
                                    <FormField v-slot="{ componentField }" name="username">
                                        <FormItem>
                                            <FormLabel class="text-zinc-600 font-normal">Username</FormLabel>
                                            <FormControl>
                                                <Input type="text" v-bind="componentField" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    </FormField>

                                    <FormField v-slot="{ componentField }" name="email">
                                        <FormItem>
                                            <FormLabel class="text-zinc-600 font-normal">Email</FormLabel>
                                            <FormControl>
                                                <Input type="email " v-bind="componentField" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    </FormField>

                                    <FormField v-slot="{ componentField }" name="password">
                                        <FormItem>
                                            <FormLabel class="text-zinc-600 font-normal">Password</FormLabel>
                                            <FormControl>
                                                <Input type="password" v-bind="componentField" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    </FormField>
                                </template>

                                <template v-if="stepIndex === 2">
                                    <FormField v-slot="{ componentField }" name="name">
                                        <FormItem>
                                            <FormLabel class="text-zinc-600 font-normal">Name</FormLabel>
                                            <FormControl>
                                                <Input type="text" v-bind="componentField" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    </FormField>

                                    <FormField v-slot="{ componentField }" name="tax_number">
                                        <FormItem>
                                            <FormLabel class="text-zinc-600 font-normal">Tax Number</FormLabel>
                                            <FormControl>
                                                <Input type="text" v-bind="componentField" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    </FormField>

                                    <FormField v-slot="{ componentField }" name="company_email">
                                        <FormItem>
                                            <FormLabel class="text-zinc-600 font-normal">Company Email</FormLabel>
                                            <FormControl>
                                                <Input type="email" v-bind="componentField" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    </FormField>
                                </template>
                            </div>

                            <div class="flex items-center justify-between mt-4">
                                <Button :disabled="isPrevDisabled" variant="outline" @click="prevStep()">
                                    <ArrowLeft class="size-4" />
                                    Back
                                </Button>
                                <div class="flex items-center gap-3">
                                    <Button v-if="stepIndex !== steps.length" :type="meta.valid ? 'button' : 'submit'"
                                        :disabled="isNextDisabled" @click="meta.valid && nextStep()">
                                        Next
                                        <ArrowRight class="size-4" />
                                    </Button>
                                    <Button v-if="stepIndex === steps.length" type="submit">
                                        Submit
                                        <ArrowRight class="size-4" />
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </Stepper>
                </Form>

                <div class="flex justify-center gap-2 mt-6 text-sm">
                    <p class="text-zinc-500 font-normal">Already have an account?</p>
                    <RouterLink to="/login" class="text-rose-500 font-medium tracking-wide hover:text-rose-600">
                        Login</RouterLink>
                </div>
            </CardContent>
        </Card>
    </div>
</template>