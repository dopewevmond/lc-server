import { object, string } from 'yup'

export const loginValidationSchema = object({
  body: object({
    username: string().required('Username is required'),
    password: string().required('Password is required')
  })
})

export const signupValidationSchema = object({
  body: object({
    username: string()
      .min(6, 'Username cannot be less than 6 characters long')
      .max(32, 'Username cannot be longer than 32 characters')
      .matches(
        /^[a-zA-Z0-9]+$/,
        'Username must contain only letters and numbers'
      )
      .required('Username is required'),
    password: string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
    displayName: string().required('Display name is required')
  })
})

export const searchValidationSchema = object({
  body: object({
    query: string().required('Search query is required')
  })
})

export const EditProfileValidationSchema = object({
  body: object({
    bio: string(),
    username: string()
      .min(6, 'Username cannot be less than 6 characters long')
      .max(32, 'Username cannot be longer than 32 characters')
      .matches(
        /^[a-zA-Z0-9]+$/,
        'Username must contain only letters and numbers'
      ),
    displayName: string()
  })
})

export const getUserByIdValidationSchema = object({
  params: object({
    id: string().required('Id is required')
  })
})
