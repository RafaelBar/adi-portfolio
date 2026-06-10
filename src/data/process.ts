import type { ProcessStep } from '@/models/types'

export const processSteps: ProcessStep[] = [
  {
    id: 'goal',
    titleKey: 'process.steps.goal.title',
    descriptionKey: 'process.steps.goal.description',
  },
  {
    id: 'briefing',
    titleKey: 'process.steps.briefing.title',
    descriptionKey: 'process.steps.briefing.description',
  },
  {
    id: 'sketches',
    titleKey: 'process.steps.sketches.title',
    descriptionKey: 'process.steps.sketches.description',
  },
  {
    id: 'color',
    titleKey: 'process.steps.color.title',
    descriptionKey: 'process.steps.color.description',
  },
  {
    id: 'touchups',
    titleKey: 'process.steps.touchups.title',
    descriptionKey: 'process.steps.touchups.description',
  },
  {
    id: 'cover',
    titleKey: 'process.steps.cover.title',
    descriptionKey: 'process.steps.cover.description',
  },
]
