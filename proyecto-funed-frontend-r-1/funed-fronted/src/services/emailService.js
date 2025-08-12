// Email service for handling verification emails
class EmailService {
  constructor() {
    this.baseUrl = 'http://localhost:3001/api'
  }

  async sendVerificationEmail(email, name, verificationToken) {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))

      const verificationUrl = `${window.location.origin}/verificar-email?token=${verificationToken}&email=${encodeURIComponent(email)}`
      
      console.log('📧 EMAIL DE VERIFICACIÓN ENVIADO:')
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
      console.log(`Para: ${email}`)
      console.log(`Nombre: ${name}`)
      console.log(`Asunto: Verifica tu cuenta en Academia FUNED`)
      console.log(`Enlace de verificación: ${verificationUrl}`)
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
      
      return { success: true, message: 'Email enviado exitosamente' }
      
    } catch (error) {
      console.error('Error enviando email:', error)
      throw new Error('Error al enviar email de verificación')
    }
  }

  generateVerificationToken() {
    return Math.random().toString(36).substring(2) + Date.now().toString(36)
  }
}

export default new EmailService()
