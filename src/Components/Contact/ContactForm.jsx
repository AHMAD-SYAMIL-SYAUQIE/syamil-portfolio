import { useState, useEffect } from 'react'
import emailjs from 'emailjs-com'
import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, BorderStyle, AlignmentType } from 'docx'
import { saveAs } from 'file-saver'
import Swal from 'sweetalert2'
import { MovingBorder } from '../../component/MovingBorder'
import '../../component/MovingBorder.css'
import './ContactForm.css'

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [cooldownRemaining, setCooldownRemaining] = useState(0)
  const [submissionCount, setSubmissionCount] = useState(0)
  const [isBlocked, setIsBlocked] = useState(false)

  const MAX_SUBMISSIONS = 2
  const COOLDOWN_DURATION = 2 * 60 * 1000 // 2 menit dalam milliseconds

  // Check localStorage on component mount
  useEffect(() => {
    const storedCount = localStorage.getItem('contactSubmissionCount')
    const lastSubmitTime = localStorage.getItem('contactLastSubmitTime')

    if (storedCount) {
      const count = parseInt(storedCount, 10)
      setSubmissionCount(count)
      if (count >= MAX_SUBMISSIONS) {
        setIsBlocked(true)
      }
    }

    if (lastSubmitTime) {
      const timeDiff = Date.now() - parseInt(lastSubmitTime, 10)
      if (timeDiff < COOLDOWN_DURATION) {
        setCooldownRemaining(Math.ceil((COOLDOWN_DURATION - timeDiff) / 1000))
      }
    }
  }, [])

  // Cooldown timer
  useEffect(() => {
    let interval
    if (cooldownRemaining > 0) {
      interval = setInterval(() => {
        setCooldownRemaining(prev => {
          if (prev <= 1) {
            clearInterval(interval)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [cooldownRemaining])

  const formatCooldown = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  // Profanity filter
  const containsProfanity = (text) => {
    const profanityList = [
      // Kata kasar Indonesia
      'anjing', 'ajing', 'anj1ng', 'anjir', 'anjrit', 'anying',
      'bangsat', 'bngst', 'b4ngsat', 'bangsad',
      'kontol', 'kntl', 'k0nt0l', 'kontil', 'kont0l', 'konti',
      'memek', 'mmk', 'm3m3k', 'memik', 'meki',
      'jancok', 'jnck', 'jancuk', 'cok', 'jancuk',
      'tolol', 't0l0l', 'goblok', 'goblog', 'gblk', 'tolot',
      'babi', 'b4bi', 'tai', 'tahi', 'taik',
      'asu', 'asyu', 'bajingan', 'bgsd', 'bajingas',
      'kimak', 'kimat', 'pepek', 'pepe', 'puki',
      'ngentot', 'ngentod', 'ngen', 'ngentoot', 'ngntot',
      'ngewe', 'ngew3', 'ngewek', 'ngew', 'ngeue',
      'colmek', 'coli', 'col1', 'c0li',
      'crot', 'cr0t', 'crotz', 'kacrot',
      'jembut', 'jmbt', 'jembud', 'jembu',
      'pantek', 'pant3k', 'pantek', 'pante',
      'peler', 'p3l3r', 'pelir', 'plir',
      'lonte', 'l0nte', 'lont3', 'lonthe',
      'sundal', 'sund4l', 'sundel',
      'perek', 'p3r3k', 'pelacur',
      'sange', 's4nge', 'sangean', 'sange2',
      'bencong', 'banci', 'b4nci', 'waria',
      // Kata kasar Inggris
      'fuck', 'fck', 'f*ck', 'fuk', 'fuc',
      'shit', 'sht', 'sh1t', 'shitt',
      'bitch', 'b1tch', 'btch', 'bitc',
      'ass', 'asshole', 'a$$', 'assh0le',
      'dick', 'd1ck', 'cock', 'c0ck',
      'damn', 'dammit', 'hell', 'bastard',
      'whore', 'slut', 'pussy', 'sex'
    ]
    
    const lowerText = text.toLowerCase()
    return profanityList.some(word => {
      const regex = new RegExp(`\\b${word}\\b`, 'i')
      return regex.test(lowerText) || lowerText.includes(word)
    })
  }

  const generateWordDocument = async (name, email, message) => {
    const currentDate = new Date()
    const formattedDate = currentDate.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
    const formattedTime = currentDate.toLocaleTimeString('id-ID')

    // Border style yang konsisten
    const tableBorder = {
      top: { style: BorderStyle.SINGLE, size: 8, color: '00A6A6' },
      bottom: { style: BorderStyle.SINGLE, size: 8, color: '00A6A6' },
      left: { style: BorderStyle.SINGLE, size: 8, color: '00A6A6' },
      right: { style: BorderStyle.SINGLE, size: 8, color: '00A6A6' },
    }

    const cellBorder = {
      top: { style: BorderStyle.SINGLE, size: 4, color: '00A6A6' },
      bottom: { style: BorderStyle.SINGLE, size: 4, color: '00A6A6' },
      left: { style: BorderStyle.SINGLE, size: 4, color: '00A6A6' },
      right: { style: BorderStyle.SINGLE, size: 4, color: '00A6A6' },
    }

    const doc = new Document({
      sections: [
        {
          children: [
            // Header
            new Paragraph({
              alignment: AlignmentType.CENTER,
              spacing: { after: 300 },
              children: [
                new TextRun({
                  text: '________________________________________',
                  color: '00A6A6',
                  size: 28,
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.CENTER,
              spacing: { after: 100 },
              children: [
                new TextRun({
                  text: 'NEW MESSAGE RECEIVED',
                  bold: true,
                  size: 44,
                  color: '000000',
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.CENTER,
              spacing: { after: 100 },
              children: [
                new TextRun({
                  text: 'Portfolio Contact Form',
                  italics: true,
                  size: 24,
                  color: '666666',
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.CENTER,
              spacing: { after: 400 },
              children: [
                new TextRun({
                  text: '________________________________________',
                  color: '00A6A6',
                  size: 28,
                }),
              ],
            }),

            // Sender Info Table
            new Table({
              width: { size: 100, type: WidthType.PERCENTAGE },
              borders: tableBorder,
              rows: [
                // Header
                new TableRow({
                  children: [
                    new TableCell({
                      columnSpan: 2,
                      borders: cellBorder,
                      children: [
                        new Paragraph({
                          alignment: AlignmentType.CENTER,
                          spacing: { before: 100, after: 100 },
                          children: [
                            new TextRun({
                              text: 'SENDER INFORMATION',
                              bold: true,
                              size: 28,
                              color: '00A6A6',
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                // Name
                new TableRow({
                  children: [
                    new TableCell({
                      width: { size: 25, type: WidthType.PERCENTAGE },
                      borders: cellBorder,
                      children: [
                        new Paragraph({
                          spacing: { before: 80, after: 80 },
                          children: [
                            new TextRun({
                              text: 'Name',
                              bold: true,
                              size: 24,
                              color: '000000',
                            }),
                          ],
                        }),
                      ],
                    }),
                    new TableCell({
                      width: { size: 75, type: WidthType.PERCENTAGE },
                      borders: cellBorder,
                      children: [
                        new Paragraph({
                          spacing: { before: 80, after: 80 },
                          children: [
                            new TextRun({
                              text: name,
                              size: 24,
                              color: '000000',
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                // Email
                new TableRow({
                  children: [
                    new TableCell({
                      width: { size: 25, type: WidthType.PERCENTAGE },
                      borders: cellBorder,
                      children: [
                        new Paragraph({
                          spacing: { before: 80, after: 80 },
                          children: [
                            new TextRun({
                              text: 'Email',
                              bold: true,
                              size: 24,
                              color: '000000',
                            }),
                          ],
                        }),
                      ],
                    }),
                    new TableCell({
                      width: { size: 75, type: WidthType.PERCENTAGE },
                      borders: cellBorder,
                      children: [
                        new Paragraph({
                          spacing: { before: 80, after: 80 },
                          children: [
                            new TextRun({
                              text: email,
                              size: 24,
                              color: '0066CC',
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                // Date
                new TableRow({
                  children: [
                    new TableCell({
                      width: { size: 25, type: WidthType.PERCENTAGE },
                      borders: cellBorder,
                      children: [
                        new Paragraph({
                          spacing: { before: 80, after: 80 },
                          children: [
                            new TextRun({
                              text: 'Date',
                              bold: true,
                              size: 24,
                              color: '000000',
                            }),
                          ],
                        }),
                      ],
                    }),
                    new TableCell({
                      width: { size: 75, type: WidthType.PERCENTAGE },
                      borders: cellBorder,
                      children: [
                        new Paragraph({
                          spacing: { before: 80, after: 80 },
                          children: [
                            new TextRun({
                              text: formattedDate,
                              size: 24,
                              color: '000000',
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                // Time
                new TableRow({
                  children: [
                    new TableCell({
                      width: { size: 25, type: WidthType.PERCENTAGE },
                      borders: cellBorder,
                      children: [
                        new Paragraph({
                          spacing: { before: 80, after: 80 },
                          children: [
                            new TextRun({
                              text: 'Time',
                              bold: true,
                              size: 24,
                              color: '000000',
                            }),
                          ],
                        }),
                      ],
                    }),
                    new TableCell({
                      width: { size: 75, type: WidthType.PERCENTAGE },
                      borders: cellBorder,
                      children: [
                        new Paragraph({
                          spacing: { before: 80, after: 80 },
                          children: [
                            new TextRun({
                              text: formattedTime + ' WIB',
                              size: 24,
                              color: '000000',
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),

            // Spacer
            new Paragraph({ spacing: { after: 300 }, text: '' }),

            // Message Table
            new Table({
              width: { size: 100, type: WidthType.PERCENTAGE },
              borders: {
                top: { style: BorderStyle.SINGLE, size: 8, color: '9D4EDD' },
                bottom: { style: BorderStyle.SINGLE, size: 8, color: '9D4EDD' },
                left: { style: BorderStyle.SINGLE, size: 8, color: '9D4EDD' },
                right: { style: BorderStyle.SINGLE, size: 8, color: '9D4EDD' },
              },
              rows: [
                // Header
                new TableRow({
                  children: [
                    new TableCell({
                      borders: {
                        top: { style: BorderStyle.SINGLE, size: 4, color: '9D4EDD' },
                        bottom: { style: BorderStyle.SINGLE, size: 4, color: '9D4EDD' },
                        left: { style: BorderStyle.SINGLE, size: 4, color: '9D4EDD' },
                        right: { style: BorderStyle.SINGLE, size: 4, color: '9D4EDD' },
                      },
                      children: [
                        new Paragraph({
                          alignment: AlignmentType.CENTER,
                          spacing: { before: 100, after: 100 },
                          children: [
                            new TextRun({
                              text: 'MESSAGE CONTENT',
                              bold: true,
                              size: 28,
                              color: '9D4EDD',
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                // Content
                new TableRow({
                  children: [
                    new TableCell({
                      borders: {
                        top: { style: BorderStyle.SINGLE, size: 4, color: '9D4EDD' },
                        bottom: { style: BorderStyle.SINGLE, size: 4, color: '9D4EDD' },
                        left: { style: BorderStyle.SINGLE, size: 4, color: '9D4EDD' },
                        right: { style: BorderStyle.SINGLE, size: 4, color: '9D4EDD' },
                      },
                      children: [
                        new Paragraph({
                          spacing: { before: 150, after: 150 },
                          children: [
                            new TextRun({
                              text: message,
                              size: 24,
                              color: '000000',
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),

            // Spacer
            new Paragraph({ spacing: { after: 400 }, text: '' }),

            // Footer
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({
                  text: '________________________________________',
                  color: '00A6A6',
                  size: 28,
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.CENTER,
              spacing: { before: 150 },
              children: [
                new TextRun({
                  text: 'Ahmad Syamil Syauqie - Portfolio',
                  bold: true,
                  size: 26,
                  color: '000000',
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.CENTER,
              spacing: { before: 50 },
              children: [
                new TextRun({
                  text: 'Network Enthusiast & IT Support Learner',
                  italics: true,
                  size: 22,
                  color: '666666',
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.CENTER,
              spacing: { before: 150 },
              children: [
                new TextRun({
                  text: '________________________________________',
                  color: '00A6A6',
                  size: 28,
                }),
              ],
            }),
          ],
        },
      ],
    })

    const blob = await Packer.toBlob(doc)
    return blob
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Check for profanity in name and message
    if (containsProfanity(formData.name) || containsProfanity(formData.message)) {
      await Swal.fire({
        icon: 'error',
        title: '⚠️ Inappropriate Content Detected',
        html: `
          <div style="text-align: center;">
            <p style="color: #ff4444; margin-bottom: 10px;">Your message contains inappropriate language.</p>
            <p style="color: #888; font-size: 14px;">Please use professional and respectful language.</p>
          </div>
        `,
        background: 'linear-gradient(135deg, #0a0a1a 0%, #1a1a2e 100%)',
        color: '#fff',
        confirmButtonText: 'Understood',
        confirmButtonColor: '#ff4444',
        customClass: {
          popup: 'swal-custom-popup',
          title: 'swal-custom-title',
          confirmButton: 'swal-custom-button'
        }
      })
      setLoading(false)
      return
    }

    // Check if user is blocked (exceeded max submissions)
    if (isBlocked) {
      await Swal.fire({
        icon: 'warning',
        title: '🚫 Limit Reached',
        html: `
          <div style="text-align: center;">
            <p style="color: #ff9800; margin-bottom: 10px;">You have reached the maximum submission limit.</p>
            <p style="color: #888; font-size: 14px;">Please contact me through social media instead.</p>
          </div>
        `,
        background: 'linear-gradient(135deg, #0a0a1a 0%, #1a1a2e 100%)',
        color: '#fff',
        confirmButtonText: 'Okay',
        confirmButtonColor: '#ff9800',
        customClass: {
          popup: 'swal-custom-popup',
          title: 'swal-custom-title',
          confirmButton: 'swal-custom-button'
        }
      })
      return
    }

    // Check cooldown
    if (cooldownRemaining > 0) {
      await Swal.fire({
        icon: 'info',
        title: '⏳ Please Wait',
        html: `
          <div style="text-align: center;">
            <p style="color: #00f7ff; margin-bottom: 10px;">You can send another message in:</p>
            <p style="color: #fff; font-size: 32px; font-weight: bold;">${formatCooldown(cooldownRemaining)}</p>
            <p style="color: #888; font-size: 14px; margin-top: 10px;">This helps prevent spam. Thank you for understanding! 🙏</p>
          </div>
        `,
        background: 'linear-gradient(135deg, #0a0a1a 0%, #1a1a2e 100%)',
        color: '#fff',
        confirmButtonText: 'Got it!',
        confirmButtonColor: '#00f7ff',
        customClass: {
          popup: 'swal-custom-popup',
          title: 'swal-custom-title',
          confirmButton: 'swal-custom-button'
        }
      })
      return
    }

    setLoading(true)

    try {
      // Generate Word document
      const wordBlob = await generateWordDocument(
        formData.name,
        formData.email,
        formData.message
      )

      // Initialize EmailJS
      emailjs.init('pfdoUQ6ig4QK-abt1') // Ganti dengan public key Emailjs mu

      // Create FormData for email
    const templateParams = {
  // Untuk email ke kamu (owner)
   from_name: formData.name,
    from_email: formData.email,

  // Untuk auto reply ke user
   name: formData.name,
   email: formData.email,

  // Pesan keduanya
  message: formData.message,

  // Tanggal
  date: new Date().toLocaleString(),
}


      // Send email
      await emailjs.send(
        'service_t43alnv', // Ganti dengan service ID Emailjs mu
        'template_1c6vykp', // Ganti dengan template ID Emailjs mu
        templateParams
      )

      // Save Word file locally as backup
      saveAs(wordBlob, `Contact_${formData.name}_${Date.now()}.docx`)

      // Success SweetAlert
      await Swal.fire({
        icon: 'success',
        title: '🚀 Message Sent!',
        html: `
          <div style="text-align: center;">
            <p style="color: #666; margin-bottom: 10px;">Thank you <strong style="color: #00f7ff;">${formData.name}</strong>!</p>
            <p style="color: #888; font-size: 14px;">Your message has been delivered successfully.</p>
            <p style="color: #888; font-size: 14px;">I'll get back to you soon! 💫</p>
          </div>
        `,
        background: 'linear-gradient(135deg, #0a0a1a 0%, #1a1a2e 100%)',
        color: '#fff',
        confirmButtonText: 'Awesome! ✨',
        confirmButtonColor: '#00f7ff',
        showClass: {
          popup: 'animate__animated animate__fadeInUp animate__faster'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutDown animate__faster'
        },
        customClass: {
          popup: 'swal-custom-popup',
          title: 'swal-custom-title',
          confirmButton: 'swal-custom-button'
        }
      })

      // Update spam protection
      const newCount = submissionCount + 1
      setSubmissionCount(newCount)
      localStorage.setItem('contactSubmissionCount', newCount.toString())
      localStorage.setItem('contactLastSubmitTime', Date.now().toString())
      
      if (newCount >= MAX_SUBMISSIONS) {
        setIsBlocked(true)
      } else {
        setCooldownRemaining(COOLDOWN_DURATION / 1000) // Set 2 menit cooldown
      }

      setFormData({
        name: '',
        email: '',
        message: ''
      })
    } catch (error) {
      console.error('Error sending message:', error)
      
      // Error SweetAlert
      await Swal.fire({
        icon: 'error',
        title: '😔 Oops!',
        html: `
          <div style="text-align: center;">
            <p style="color: #ff6b6b; margin-bottom: 10px;">Something went wrong</p>
            <p style="color: #888; font-size: 14px;">Please try again or contact me directly via social media.</p>
          </div>
        `,
        background: 'linear-gradient(135deg, #0a0a1a 0%, #1a1a2e 100%)',
        color: '#fff',
        confirmButtonText: 'Try Again',
        confirmButtonColor: '#ff6b6b',
        showClass: {
          popup: 'animate__animated animate__shakeX'
        },
        customClass: {
          popup: 'swal-custom-popup',
          title: 'swal-custom-title',
          confirmButton: 'swal-custom-button'
        }
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="contact-form">
      <form onSubmit={handleSubmit}>
        <div className={`form-group floating-label ${formData.name ? 'has-value' : ''}`}>
          <input
            type="text"
            name="name"
            id="name"
            placeholder=" "
            value={formData.name}
            onChange={handleChange}
            required
            disabled={loading}
          />
          <label htmlFor="name">Your Name</label>
          <div className="input-highlight"></div>
        </div>
        <div className={`form-group floating-label ${formData.email ? 'has-value' : ''}`}>
          <input
            type="email"
            name="email"
            id="email"
            placeholder=" "
            value={formData.email}
            onChange={handleChange}
            required
            disabled={loading}
          />
          <label htmlFor="email">Email Address</label>
          <div className="input-highlight"></div>
        </div>
        <div className={`form-group floating-label ${formData.message ? 'has-value' : ''}`}>
          <textarea
            name="message"
            id="message"
            placeholder=" "
            value={formData.message}
            onChange={handleChange}
            required
            disabled={loading}
          ></textarea>
          <label htmlFor="message">Your Message</label>
          <div className="input-highlight"></div>
        </div>
        <MovingBorder
          as="button"
          type="submit"
          borderRadius="12px"
          duration={3000}
          containerClassName="moving-border-full"
          disabled={loading || cooldownRemaining > 0 || isBlocked}
        >
          {loading ? 'Sending...' : 
           isBlocked ? '🚫 Limit Reached' :
           cooldownRemaining > 0 ? `⏳ Wait ${formatCooldown(cooldownRemaining)}` : 
           'Send Message'}
        </MovingBorder>
      </form>
    </div>
  )
}

export default ContactForm