import { Container } from '@/components/themes/pocket/Container'

const faqs = [
  [
    {
      question: 'What exactly does the app let me capture?',
      answer:
        'You can easily record your child’s milestones, first words, favorite things, funny quotes, family traditions, and more — all in one beautifully organized place.',
    },
    {
      question: 'Is it free to use?',
      answer:
        'Yes! You can get started for free and begin capturing memories right away. We also offer optional premium features for even more customization and storage.',
    },
    {
      question: 'Do I need to be tech-savvy to use it?',
      answer:
        'Not at all. Our app is designed to be simple, intuitive, and easy to use — whether you’re tech-savvy or not. Just open it, type or talk, and you’re all set.',
    },
  ],
  [
    {
      question: 'Can I use this for more than one child?',
      answer:
        'Absolutely! You can create separate profiles for each child and document their unique journey, all within the same account.',
    },
    {
      question: 'What if I forget to update regularly?',
      answer:
        'Life gets busy — we get it. You can add entries whenever you have time. You can even backdate moments so nothing is lost.',
    },
    {
      question: 'Can I add photos or audio?',
      answer:
        'Yes! You can attach photos to memories and even record your child’s voice to preserve those priceless pronunciations and sweet sayings.',
    },
  ],
  [
    {
      question: 'Is my data private and secure?',
      answer:
        'Your memories are precious, and we treat them that way. All your data is encrypted and stored securely. We never sell your information.',
    },
    {
      question: 'Can I export or print a journal later?',
      answer:
        'Yes, you’ll be able to export your entries or even create a printed keepsake journal to treasure forever.',
    },
    {
      question: 'What makes this different from other baby tracking apps?',
      answer:
        'This isn’t just a tracker — it’s a memory keeper. While others focus on sleep or feeding logs, we focus on the heartwarming stuff you’ll actually want to look back on years from now.',
    },
  ],
]


export function Faqs() {
  return (
    <section
      id="faqs"
      aria-labelledby="faqs-title"
      className="border-t py-20 sm:py-32"
    >
      <Container>
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2
            id="faqs-title"
            className="text-3xl font-medium tracking-tight text-primary"
          >
            Frequently asked questions
          </h2>
          {/* <p className="mt-2 text-lg text-primary-foreground">
            If you have anything else you want to ask,{' '}
            <a
              href="mailto:info@example.com"
              className="text-gray-900 underline"
            >
              reach out to us
            </a>
            .
          </p> */}
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:max-w-none lg:grid-cols-3"
        >
          {faqs.map((column, columnIndex) => (
            <li key={columnIndex}>
              <ul role="list" className="space-y-10">
                {column.map((faq, faqIndex) => (
                  <li key={faqIndex}>
                    <h3 className="text-lg/6 font-semibold text-primary">
                      {faq.question}
                    </h3>
                    <p className="mt-4 text-sm text-gray-900">{faq.answer}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
