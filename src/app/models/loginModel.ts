export interface AuthFormType {
    // onFormSubmit: (formData: LoginModelType) => void
    onFormSubmit: (formData: FormData) => void
    pageType: "login" | "register"
}

export interface LoginModelType {
    email: string
    password: string
}

export interface RegisterModelType extends LoginModelType {
    username: string
}