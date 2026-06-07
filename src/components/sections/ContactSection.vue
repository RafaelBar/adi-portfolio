<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { profile, whatsappUrl } from '@/data/profile'
import type { ContactAudience } from '@/models/types'
import { submitContactForm } from '@/lib/contactForm'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import ScrollReveal from '@/components/ui/ScrollReveal.vue'
import SocialIcon from '@/components/ui/SocialIcon.vue'

const { t } = useI18n()

const audiences: ContactAudience[] = ['publisher', 'art-director', 'individual', 'other']

const form = reactive({
  audience: 'individual' as ContactAudience,
  name: '',
  email: '',
  phone: '',
  message: '',
})

const submitting = ref(false)
const submitted = ref(false)
const submitError = ref('')

function resetStatus() {
  submitted.value = false
  submitError.value = ''
}

function formatPhone(value: string): string {
  const trimmed = value.trim()
  if (!trimmed) return ''

  if (trimmed.startsWith('+')) {
    const digits = trimmed.slice(1).replace(/\D/g, '')
    return digits ? `+${digits}` : ''
  }

  return trimmed.replace(/\s+/g, ' ')
}

function buildPayload() {
  const name = form.name.trim()
  const email = form.email.trim()
  const phone = formatPhone(form.phone)
  const message = form.message.trim()

  return {
    name,
    email,
    phone,
    message,
    subject: t(`contact.subjects.${form.audience}`),
  }
}

function resetForm() {
  form.audience = 'individual'
  form.name = ''
  form.email = ''
  form.phone = ''
  form.message = ''
}

async function submitForm() {
  resetStatus()
  submitting.value = true

  const payload = buildPayload()

  try {
    await submitContactForm(payload)
    submitted.value = true
    resetForm()
  } catch {
    submitError.value = t('contact.error')
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <section id="contact" class="contact section">
    <div class="container">
      <ScrollReveal>
        <SectionHeading
          label-key="contact.label"
          title-key="contact.title"
          subtitle-key="contact.subtitle"
        />
      </ScrollReveal>

      <div class="contact__grid">
        <ScrollReveal>
          <form class="contact__form" @submit.prevent="submitForm">
            <label class="contact__field">
              <span class="contact__label">{{ t('contact.audienceLabel') }}</span>
              <select
                v-model="form.audience"
                class="contact__input contact__select"
                required
                :disabled="submitting"
                @change="resetStatus"
              >
                <option v-for="audience in audiences" :key="audience" :value="audience">
                  {{ t(`contact.audiences.${audience}`) }}
                </option>
              </select>
            </label>

            <label class="contact__field">
              <span class="contact__label">{{ t('contact.nameLabel') }}</span>
              <input
                v-model="form.name"
                type="text"
                class="contact__input"
                required
                :disabled="submitting"
                @input="resetStatus"
              />
            </label>

            <label class="contact__field">
              <span class="contact__label">{{ t('contact.emailLabel') }}</span>
              <input
                v-model="form.email"
                type="email"
                class="contact__input"
                required
                :disabled="submitting"
                @input="resetStatus"
              />
            </label>

            <label class="contact__field">
              <span class="contact__label">{{ t('contact.formPhoneLabel') }}</span>
              <input
                v-model="form.phone"
                type="tel"
                class="contact__input contact__input--tel"
                dir="ltr"
                autocomplete="tel"
                inputmode="tel"
                :placeholder="t('contact.phonePlaceholder')"
                :disabled="submitting"
                @input="resetStatus"
              />
            </label>

            <label class="contact__field">
              <span class="contact__label">{{ t('contact.messageLabel') }}</span>
              <textarea
                v-model="form.message"
                class="contact__input contact__textarea"
                rows="5"
                :placeholder="t('contact.messagePlaceholder')"
                required
                :disabled="submitting"
                @input="resetStatus"
              />
            </label>

            <p v-if="submitted" class="contact__feedback contact__feedback--success" role="status">
              {{ t('contact.success') }}
            </p>
            <p v-else-if="submitError" class="contact__feedback contact__feedback--error" role="alert">
              {{ submitError }}
            </p>

            <button type="submit" class="btn btn--primary contact__submit" :disabled="submitting">
              {{ submitting ? t('contact.sending') : t('contact.submit') }}
            </button>
          </form>
        </ScrollReveal>

        <ScrollReveal>
          <aside class="contact__aside">
            <p class="contact__or">{{ t('contact.orEmail') }}</p>
            <a :href="`mailto:${profile.email}`" class="contact__channel">
              <SocialIcon name="email" />
              <span>{{ profile.email }}</span>
            </a>
            <p class="contact__phone-label">{{ t('contact.phoneLabel') }}</p>
            <a
              :href="whatsappUrl(profile.phone)"
              class="contact__channel contact__channel--phone"
              target="_blank"
              rel="noopener noreferrer"
            >
              <SocialIcon name="phone" />
              <span dir="ltr">{{ profile.phone }}</span>
            </a>
          </aside>
        </ScrollReveal>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact__grid {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: clamp(2rem, 4vw, 3rem);
  align-items: start;
}

.contact__form {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
  padding: var(--space-xl);
  border-radius: var(--radius-lg);
  background: rgba(255, 255, 255, 0.75);
  border: 1px solid rgba(61, 58, 54, 0.08);
  box-shadow: var(--shadow-soft);
}

.contact__field {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.contact__label {
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--color-ink-soft);
}

.contact__input {
  padding: 0.875rem 1rem;
  border-radius: var(--radius-sm);
  border: 1px solid rgba(61, 58, 54, 0.14);
  background: var(--color-white);
  transition: border-color var(--transition);
}

.contact__input:focus {
  outline: none;
  border-color: var(--color-ink);
}

.contact__input:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.contact__textarea {
  resize: vertical;
  min-height: 8rem;
}

.contact__input--tel {
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.02em;
}

.contact__feedback {
  margin: 0;
  font-size: 0.9375rem;
  font-weight: 600;
}

.contact__feedback--success {
  color: #2f6b3a;
}

.contact__feedback--error {
  color: #9b3d3d;
}

.contact__submit {
  align-self: flex-start;
}

.contact__submit:disabled {
  opacity: 0.75;
  cursor: wait;
}

.contact__aside {
  position: relative;
  overflow: hidden;
  padding: var(--space-xl);
  border-radius: var(--radius-lg);
  background:
    linear-gradient(
      160deg,
      color-mix(in srgb, var(--color-lavender) 58%, #fff),
      color-mix(in srgb, var(--color-sage) 50%, #fff)
    ),
    rgba(255, 255, 255, 0.92);
  border: 1px solid color-mix(in srgb, var(--color-lavender) 22%, rgba(61, 58, 54, 0.1));
  box-shadow: var(--shadow-card);
  min-height: 12rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: var(--space-md);
}

.contact__aside::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.85);
}

.contact__or,
.contact__phone-label,
.contact__channel {
  position: relative;
  z-index: 1;
}

.contact__or,
.contact__phone-label {
  font-weight: 700;
  color: var(--color-ink-soft);
}

.contact__phone-label {
  margin-top: var(--space-sm);
}

.contact__channel {
  display: inline-flex;
  align-items: center;
  gap: var(--space-sm);
  font-family: var(--font-display);
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-ink);
  word-break: break-all;
  transition: opacity var(--transition);
}

.contact__channel:hover {
  opacity: 0.75;
}

.contact__channel--phone span {
  font-family: var(--font-body);
  font-size: 1.0625rem;
  letter-spacing: 0.02em;
}

@media (max-width: 768px) {
  .contact__grid {
    grid-template-columns: 1fr;
  }
}
</style>
