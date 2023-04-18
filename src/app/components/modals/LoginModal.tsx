'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';

// Custom hook
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';

// Components
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import Button from '../Button';

const LoginModal = () => {
  // hooks
  const router = useRouter();

  // custom hooks
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  // local state
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { email: '', password: '' },
  });

  // Functions
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    signIn('credentials', { ...data, redirect: false }).then((callback) => {
      setIsLoading(false);

      if (callback?.ok) {
        toast.success('Logged in');
        router.refresh();
        loginModal.onClose();
      }

      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Heading title='Welcome back' subtitle='Login to your account' />
      <form className='flex flex-col gap-4'>
        <Input
          id='email'
          label='Email'
          type='email'
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Input
          id='password'
          type='password'
          label='Password'
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </form>
    </div>
  );

  const footerContent = (
    <div className='flex flex-col gap-4 mt-3'>
      <hr />

      <Button
        outline
        label='Continue with Google'
        icon={FcGoogle}
        onClick={() => {}}
      />

      <Button
        outline
        label='Continue with Github'
        icon={AiFillGithub}
        onClick={() => {}}
      />

      <div className='text-neutral-500 font-light text-center mt-4'>
        <div className='flex justify-center items-center gap-2'>
          <div>Don&apos;t have an account?</div>
          <div
            onClick={loginModal.onClose}
            className='text-neutral-800 cursor-pointer hover:underline'
          >
            Sign Up
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title='Login'
      actionLabel='Continue'
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
