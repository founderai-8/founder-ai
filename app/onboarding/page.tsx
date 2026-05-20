'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function Onboarding() {
  const router = useRouter()
  const [section, setSection] = useState(1)
  const [form, setForm] = useState<any>({
    what_building: '', customer: '', stage: '', problem: '',
    country: '', target_market: [] as string[], sector: '', business_model: '', product_type: '',
    budget: '', time_available: '', team_size: '', audience_size: '', investor_access: '',
    background: '', first_business: '', failed_before: '', biggest_mistake: '',
    end_goal: '', biggest_fear: '', revenue_timeline: ''
  })

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) { router.push('/auth/login'); return }
      const { data: profile } = await supabase.from('founder_profiles').select('user_id').eq('user_id', data.user.id).single()
      if (profile) router.push('/mentor')
    })
  }, [])

  const setPill = (field: string, value: string, multi = false) => {
    if (multi) {
      setForm((f: any) => ({
        ...f,
        [field]: f[field].includes(value) ? f[field].filter((v: string) => v !== value) : [...f[field], value]
      }))
    } else {
      setForm((f: any) => ({ ...f, [field]: value }))
    }
  }

  const pillStyle = (field: string, value: string, multi = false) => {
    const active = multi ? form[field].includes(value) : form[field] === value
    return {
      padding: '8px 16px', borderRadius: 8, border: '1px solid',
      borderColor: active ? '#534AB7' : '#1e2340',
      background: active ? '#534AB7' : 'transparent',
      color: 'white', cursor: 'pointer', fontSize: 13, margin: '4px', display: 'inline-block'
    }
  }

  const Pill = ({ field, value, multi = false }: any) => (
    <button onClick={() => setPill(field, value, multi)} style={pillStyle(field, value, multi)}>{value}</button>
  )

  const Textarea = ({ field, placeholder }: any) => (
    <textarea
      value={form[field]}
      onChange={e => setForm((f: any) => ({ ...f, [field]: e.target.value }))}
      placeholder={placeholder}
      rows={3}
      style={{ width: '100%', background: '#0f1229', border: '1px solid #1e2340', borderRadius: 8, color: 'white', padding: '12px', fontSize: 14, outline: 'none', resize: 'vertical', boxSizing: 'border-box', marginTop: 8 }}
    />
  )

  const Label = ({ text, sub }: any) => (
    <div style={{ marginBottom: 16, marginTop: 24 }}>
      <div style={{ fontWeight: 600, fontSize: 15 }}>{text}</div>
      {sub && <div style={{ fontSize: 13, color: '#6b7280', marginTop: 4 }}>{sub}</div>}
    </div>
  )

  const handleSubmit = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const payload = { ...form, target_market: form.target_market.join(', ') }
    await supabase.from('founder_profiles').upsert({ user_id: user.id, ...payload })
    router.push('/mentor')
  }

  const sections = ['Your Business', 'Your Market', 'Your Resources', 'Your Background', 'Goals & Mindset']

  return (
    <div style={{ minHeight: '100vh', background: '#0a0c1a', color: 'white', fontFamily: 'system-ui', padding: '40px 20px' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>

        {/* Progress */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ fontSize: 13, color: '#7F77DD', marginBottom: 8 }}>{section} / 5 — {sections[section - 1]}</div>
          <div style={{ height: 3, background: '#1e2340', borderRadius: 2 }}>
            <div style={{ height: '100%', background: '#534AB7', borderRadius: 2, width: `${(section / 5) * 100}%`, transition: 'width 0.3s' }} />
          </div>
        </div>

        {/* SEZIONE 1 — Your Business */}
        {section === 1 && (
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Your Business</h2>
            <span style={{ fontSize: 12, background: '#1e2340', color: '#7F77DD', padding: '2px 10px', borderRadius: 20 }}>Required</span>

            <Label text="What are you building?" sub="One or two sentences. Don't pitch — just explain." />
            <Textarea field="what_building" placeholder="We help X do Y by doing Z..." />

            <Label text="Who is your customer?" sub="Be specific. Not 'small businesses' — who exactly?" />
            <Textarea field="customer" placeholder="First-time founders who..." />

            <Label text="Where are you right now?" sub="Be honest. This changes everything." />
            <div style={{ marginTop: 8 }}>
              {['Just an idea', 'Building MVP', 'Launched, pre-revenue', 'Early revenue ($1–$5k MRR)', 'Growing ($5k+ MRR)'].map(v => (
                <Pill key={v} field="stage" value={v} />
              ))}
            </div>

            <Label text="Most urgent problem right now?" sub="What's actually keeping you up at night." />
            <Textarea field="problem" placeholder="The biggest thing blocking me right now is..." />
          </div>
        )}

        {/* SEZIONE 2 — Your Market */}
        {section === 2 && (
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Your Market</h2>
            <span style={{ fontSize: 12, background: '#1e2340', color: '#6b7280', padding: '2px 10px', borderRadius: 20 }}>Optional — skip if you prefer</span>

            <Label text="Where are you based?" sub="Affects regulations, funding access, market dynamics." />
            <select
              value={form.country}
              onChange={e => setForm((f: any) => ({ ...f, country: e.target.value }))}
              style={{ width: '100%', background: '#0f1229', border: '1px solid #1e2340', borderRadius: 8, color: 'white', padding: '12px', fontSize: 14, outline: 'none', marginTop: 8 }}
            >
              <option value="">Select your country...</option>
              {['Afghanistan','Albania','Algeria','Argentina','Australia','Austria','Belgium','Bolivia','Brazil','Canada','Chile','China','Colombia','Croatia','Czech Republic','Denmark','Ecuador','Egypt','Estonia','Finland','France','Germany','Ghana','Greece','Hungary','India','Indonesia','Iran','Ireland','Israel','Italy','Japan','Jordan','Kenya','Latvia','Lithuania','Malaysia','Mexico','Morocco','Netherlands','New Zealand','Nigeria','Norway','Pakistan','Peru','Philippines','Poland','Portugal','Romania','Russia','Saudi Arabia','Singapore','South Africa','South Korea','Spain','Sweden','Switzerland','Taiwan','Thailand','Turkey','Ukraine','United Arab Emirates','United Kingdom','United States','Uruguay','Venezuela','Vietnam','Other'].map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            <Label text="Target market?" sub="Where you sell. Can be multiple." />
            <div style={{ marginTop: 8 }}>
              {['Local / National', 'Europe', 'North America', 'Latin America', 'Asia Pacific', 'Global', 'No geographic focus'].map(v => (
                <Pill key={v} field="target_market" value={v} multi={true} />
              ))}
            </div>

            <Label text="What sector?" />
            <div style={{ marginTop: 8 }}>
              {['SaaS / Software', 'E-commerce / DTC', 'Marketplace', 'Creator Economy', 'Services / Agency', 'Fintech', 'Healthtech', 'Edtech', 'Hardware / Physical', 'Other'].map(v => (
                <Pill key={v} field="sector" value={v} />
              ))}
            </div>

            <Label text="B2B or B2C?" />
            <div style={{ marginTop: 8 }}>
              {['B2B', 'B2C', 'B2B2C', 'Both', 'Marketplace'].map(v => (
                <Pill key={v} field="business_model" value={v} />
              ))}
            </div>

            <Label text="Type of product?" />
            <div style={{ marginTop: 8 }}>
              {['Digital', 'Physical', 'Service', 'Hybrid'].map(v => (
                <Pill key={v} field="product_type" value={v} />
              ))}
            </div>
          </div>
        )}

        {/* SEZIONE 3 — Your Resources */}
        {section === 3 && (
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Your Resources</h2>
            <span style={{ fontSize: 12, background: '#1e2340', color: '#6b7280', padding: '2px 10px', borderRadius: 20 }}>Optional — skip if you prefer</span>

            <Label text="Budget available?" sub="Total capital you can deploy right now." />
            <div style={{ marginTop: 8 }}>
              {['Bootstrap / $0', 'Under $5k', '$5k – $20k', '$20k – $100k', '$100k+', 'Funded'].map(v => (
                <Pill key={v} field="budget" value={v} />
              ))}
            </div>

            <Label text="Time available?" />
            <div style={{ marginTop: 8 }}>
              {['Side project', 'Part-time (~20h/week)', 'Full-time', 'All in (80h+)'].map(v => (
                <Pill key={v} field="time_available" value={v} />
              ))}
            </div>

            <Label text="Solo or team?" />
            <div style={{ marginTop: 8 }}>
              {['Solo founder', 'Co-founder', 'Small team (3–5)', 'Team (6+)'].map(v => (
                <Pill key={v} field="team_size" value={v} />
              ))}
            </div>

            <Label text="Existing audience?" sub="Social, newsletter, community — any distribution." />
            <div style={{ marginTop: 8 }}>
              {['No audience', 'Small (under 1k)', 'Medium (1k–10k)', 'Large (10k+)'].map(v => (
                <Pill key={v} field="audience_size" value={v} />
              ))}
            </div>

            <Label text="Investor / network access?" />
            <div style={{ marginTop: 8 }}>
              {['No network', 'Some connections', 'Strong network', 'Already funded'].map(v => (
                <Pill key={v} field="investor_access" value={v} />
              ))}
            </div>
          </div>
        )}

        {/* SEZIONE 4 — Your Background */}
        {section === 4 && (
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Your Background</h2>
            <span style={{ fontSize: 12, background: '#1e2340', color: '#6b7280', padding: '2px 10px', borderRadius: 20 }}>Optional — skip if you prefer</span>

            <Label text="Main background?" />
            <div style={{ marginTop: 8 }}>
              {['Technical', 'Business', 'Creative', 'Domain expert', 'Generalist'].map(v => (
                <Pill key={v} field="background" value={v} />
              ))}
            </div>

            <Label text="First business?" />
            <div style={{ marginTop: 8 }}>
              {['Yes, first time', 'Tried before', 'Serial founder', 'Operator turned founder'].map(v => (
                <Pill key={v} field="first_business" value={v} />
              ))}
            </div>

            <Label text="Failed a previous project?" />
            <div style={{ marginTop: 8 }}>
              {['No', 'Yes, small', 'Yes, significantly', 'Multiple times'].map(v => (
                <Pill key={v} field="failed_before" value={v} />
              ))}
            </div>

            <Label text="Biggest mistake so far?" sub="Skip if none yet." />
            <Textarea field="biggest_mistake" placeholder="The mistake that taught me the most was..." />
          </div>
        )}

        {/* SEZIONE 5 — Goals & Mindset */}
        {section === 5 && (
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Goals & Mindset</h2>
            <span style={{ fontSize: 12, background: '#1e2340', color: '#6b7280', padding: '2px 10px', borderRadius: 20 }}>Optional — skip if you prefer</span>

            <Label text="End goal?" sub="No right answer — but it changes everything." />
            <div style={{ marginTop: 8 }}>
              {['Lifestyle business', 'Scale & grow', 'Exit / acquisition', 'VC-backed startup', 'Impact / mission', 'Not sure yet'].map(v => (
                <Pill key={v} field="end_goal" value={v} />
              ))}
            </div>

            <Label text="Biggest fear right now?" />
            <div style={{ marginTop: 8 }}>
              {['Failing publicly', 'Running out of money', 'Building the wrong thing', 'Getting crushed by competition', 'Doing this alone', 'Moving too slow'].map(v => (
                <Pill key={v} field="biggest_fear" value={v} />
              ))}
            </div>

            <Label text="Timeline to first revenue?" />
            <div style={{ marginTop: 8 }}>
              {['Already generating', 'Within 1 month', '1–3 months', '3–6 months', '6–12 months', 'Not sure'].map(v => (
                <Pill key={v} field="revenue_timeline" value={v} />
              ))}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 48 }}>
          {section > 1 ? (
            <button onClick={() => setSection(s => s - 1)} style={{ background: 'transparent', border: '1px solid #1e2340', color: 'white', padding: '12px 24px', borderRadius: 8, cursor: 'pointer', fontSize: 14 }}>
              ← Back
            </button>
          ) : <span />}

          {section < 5 ? (
            <button onClick={() => setSection(s => s + 1)} style={{ background: '#534AB7', border: 'none', color: 'white', padding: '12px 24px', borderRadius: 8, cursor: 'pointer', fontSize: 14 }}>
              Next →
            </button>
          ) : (
            <button onClick={handleSubmit} style={{ background: '#534AB7', border: 'none', color: 'white', padding: '12px 24px', borderRadius: 8, cursor: 'pointer', fontSize: 14, fontWeight: 600 }}>
              Start with your mentor →
            </button>
          )}
        </div>

      </div>
    </div>
  )
}
