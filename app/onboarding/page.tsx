'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

const steps = [
    { field: 'startup_name', label: 'Come si chiama la tua startup o progetto?', type: 'input', placeholder: 'es. FounderAI' },
    { field: 'sector', label: 'In quale settore operi?', type: 'input', placeholder: 'es. SaaS, E-commerce, FinTech...' },
    { field: 'country', label: 'Da quale paese operi?', type: 'input', placeholder: 'es. Italia, USA...' },
    { field: 'idea', label: 'Descrivi la tua idea in una frase.', type: 'textarea', placeholder: 'La mia startup aiuta...' },
    { field: 'customer', label: 'Chi è il tuo cliente target?', type: 'textarea', placeholder: 'es. Founder early-stage in Italia...' },
    { field: 'team', label: 'Con chi stai costruendo?', type: 'textarea', placeholder: 'es. Solo fondatore, con un co-founder tecnico...' },
    { field: 'problem', label: 'Quale problema stai risolvendo?', type: 'textarea', placeholder: 'Il problema principale è...' },
    { field: 'goal', label: 'Obiettivo principale nei prossimi 6 mesi?', type: 'textarea', placeholder: 'Voglio raggiungere...' },
    { field: 'fear', label: 'Cosa temi di più in questo percorso?', type: 'textarea', placeholder: 'La mia paura principale è...' },
]

export default function OnboardingPage() {
    const router = useRouter()
    const [step, setStep] = useState(0)
    const [values, setValues] = useState<Record<string, string>>({})
    const [loading, setLoading] = useState(false)
    const [visible, setVisible] = useState(true)

    const current = steps[step]
    const isLast = step === steps.length - 1

    const goTo = (next: number) => {
        setVisible(false)
        setTimeout(() => {
            setStep(next)
            setVisible(true)
        }, 150)
    }

    const handleNext = async () => {
        if (isLast) {
            setLoading(true)
            const { data: { user } } = await supabase.auth.getUser()
            if (user) {
                await supabase.from('founder_profiles').upsert({
                    user_id: user.id,
                    ...values,
                })
            }
            router.push('/mentor')
        } else {
            goTo(step + 1)
        }
    }

    const progress = ((step + 1) / steps.length) * 100

    return (
        <div
            className="min-h-screen bg-[#0a0c1a] text-white flex flex-col items-center justify-center px-4"
            style={{ fontFamily: 'system-ui, sans-serif' }}
        >
            <div className="w-full max-w-md mb-8">
                <div className="flex justify-between text-xs text-gray-400 mb-2">
                    <span>Step {step + 1} di {steps.length}</span>
                    <span>{Math.round(progress)}%</span>
                </div>
                <div className="h-1 bg-[#1e2340] rounded-full">
                    <div
                        className="h-1 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%`, backgroundColor: '#534AB7' }}
                    />
                </div>
            </div>

            <div
                className="w-full max-w-md transition-opacity duration-150"
                style={{ opacity: visible ? 1 : 0 }}
            >
                <label className="block text-lg font-semibold mb-5">{current.label}</label>

                {current.type === 'input' ? (
                    <input
                        key={current.field}
                        type="text"
                        value={values[current.field] ?? ''}
                        onChange={e => setValues(v => ({ ...v, [current.field]: e.target.value }))}
                        onKeyDown={e => e.key === 'Enter' && handleNext()}
                        placeholder={current.placeholder}
                        autoFocus
                        className="w-full bg-[#0f1229] border border-[#1e2340] text-white rounded-xl px-4 py-3 outline-none focus:border-[#534AB7] text-sm"
                    />
                ) : (
                    <textarea
                        key={current.field}
                        value={values[current.field] ?? ''}
                        onChange={e => setValues(v => ({ ...v, [current.field]: e.target.value }))}
                        placeholder={current.placeholder}
                        rows={4}
                        autoFocus
                        className="w-full bg-[#0f1229] border border-[#1e2340] text-white rounded-xl px-4 py-3 outline-none focus:border-[#534AB7] text-sm resize-none"
                    />
                )}

                <div className="flex gap-3 mt-6">
                    {step > 0 && (
                        <button
                            onClick={() => goTo(step - 1)}
                            className="flex-1 border border-[#1e2340] text-gray-400 rounded-xl py-3 font-medium hover:text-white hover:border-[#534AB7] transition-colors text-sm"
                        >
                            ← Indietro
                        </button>
                    )}
                    <button
                        onClick={handleNext}
                        disabled={loading}
                        className="flex-1 text-white rounded-xl py-3 font-medium transition-colors disabled:opacity-40 text-sm"
                        style={{ backgroundColor: '#534AB7' }}
                    >
                        {loading ? '...' : isLast ? 'Inizia con il tuo mentor →' : 'Avanti →'}
                    </button>
                </div>
            </div>
        </div>
    )
}
