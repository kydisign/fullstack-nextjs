'use server'

// import Bcrypt untuk hashing password
import bcrypt from 'bcryptjs'

// import prisma client
import { prisma } from '@/lib/db'

// import redirect dari next/navigation
import { redirect } from 'next/navigation'

// import signUpSchema dari schemas
import { signUpSchema } from '@/schemas/auth/sign-up.schema'

//interface untuk error validasi
interface SignUpActionState {
  errors: {
    name?: string[]
    email?: string[]
    password?: string[]
    termsAccepted?: string[]
    _form?: string[]
  }
}

/**
 * Action untuk proses sign-up
 * @param formData data dari form sign-up
 */
export async function signUpAction(
  _prevState: SignUpActionState,
  formData: FormData
): Promise<SignUpActionState> {
  const result = signUpSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    termsAccepted:
      formData.get('termsAccepted') === 'on' ||
      formData.get('termsAccepted') === 'true',
  });

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  try {
    const hashedPassword = await bcrypt.hash(result.data.password, 10);

    await prisma.user.create({
      data: {
        name: result.data.name,
        email: result.data.email,
        password: hashedPassword,
      },
    });
  } catch (error: unknown) {
    console.error('Sign-up failed:', error);

    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      error.code === 'P2002'
    ) {
      return {
        errors: {
          email: ['Email already registered'],
        },
      };
    }

    return {
      errors: {
        _form: ['Registration failed, please try again'],
      },
    };
  }

  redirect('/sign-in');
}