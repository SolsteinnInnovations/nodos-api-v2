
export const isEmail = (email: string) : string | Error  => {
    const isEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    const trimEmail = isEmailRegex.test(email) ? email.trim() : "";

    if (!trimEmail) {
        throw new Error('El email ingresado no tiene forma de email')
    }

    return trimEmail
}
