'use client'

import { useState } from 'react'
import { toast } from 'react-toastify'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { CircleUserRound, Eye, EyeOff, LogIn } from 'lucide-react'
import { Button, Card, Checkbox, Input } from '@nextui-org/react'
import encode from '../lib/utils/encode'

export default function LoginForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({})

  const onSubmit = async data => {
    setLoading(true)
    const hashedPassword = await encode(data.password)
    const res = await signIn('credentials', {
      username: data.username,
      password: hashedPassword,
      redirect: false
    })

    if (res?.status === 200) {
      router.push('/')
      toast.success('با موفقیت وارد شدید')
    } else {
      toast.error('نام کاربری یا رمز عبور اشتباه است')
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className='px-10 lg:px-14 mt-20 py-10 w-80 md:w-96 lg:w-[500px] md:mt-0'>
        <div className='flex flex-col items-center text-gray-800 mb-14'>
          <CircleUserRound size={60} className='mb-3' />
          <h2 className='text-2xl font-bold '>ورود به پنل مدیریت</h2>
        </div>
        <div className='flex flex-col gap-7'>
          <div>
            <Input
              type='text'
              label='ایمیل'
              color={errors.username ? 'danger' : 'primary'}
              variant='bordered'
              isInvalid={errors.username}
              errorMessage={errors.username && 'ایمیل وارد شده نامعتبر است'}
              className='h-12'
              dir='ltr'
              {...register('username', {
                required: true
              })}
            />
          </div>
          <div>
            <Input
              type={showPassword ? 'text' : 'password'}
              label='رمز عبور'
              color={errors.password ? 'danger' : 'primary'}
              variant='bordered'
              isInvalid={errors.password}
              errorMessage={errors.password && 'رمز عبور وارد شده نامعتبر است'}
              className='h-12'
              dir='ltr'
              {...register('password', {
                required: true
              })}
            />
            <Checkbox
              dir='rtl'
              className='mt-3 -mr-4'
              onChange={() => setShowPassword(!showPassword)}
            >
              <p className='pr-2 text-sm'>نمایش رمز عبور</p>
            </Checkbox>
          </div>
          <Button
            color='primary'
            radius='sm'
            type='submit'
            isLoading={loading}
            className='font-semibold'
          >
            <LogIn />
            ورود به حساب کاربری
          </Button>
        </div>
      </Card>
    </form>
  )
}
