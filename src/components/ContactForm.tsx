'use client';

import React, { useState } from 'react';
import styles from './ContactForm.module.scss';

type FormState = {
  name: string;
  email: string;
  phone: string;
  destination: string;
  message: string;
};

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    destination: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState<{ type: 'success'|'error'; text: string } | null>(null);

  function update<K extends keyof FormState>(k: K, v: FormState[K]) {
    setForm(prev => ({ ...prev, [k]: v }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setNotice(null);

    // client-side validation
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setNotice({ type: 'error', text: 'Please fill name, email and message.' });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const err = await res.json().catch(()=>({ error: 'Unknown error' }));
        setNotice({ type: 'error', text: err?.error || 'Submission failed' });
      } else {
        setNotice({ type: 'success', text: 'Thanks — your inquiry was received. We will contact you soon.' });
        setForm({ name: '', email: '', phone: '', destination: '', message: '' });
      }
    } catch (err) {
      setNotice({ type: 'error', text: 'Network error — try again.' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className={styles.formWrap} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <div className={`${styles.field} ${styles.col}`}>
          <label className={styles.label}>Full name*</label>
          <input className={styles.input} value={form.name} onChange={e => update('name', e.target.value)} placeholder="Your full name" />
        </div>

        <div className={`${styles.field} ${styles.col}`}>
          <label className={styles.label}>Email*</label>
          <input className={styles.input} value={form.email} onChange={e => update('email', e.target.value)} placeholder="you@example.com" />
        </div>
      </div>

      <div className={styles.row}>
        <div className={`${styles.field} ${styles.col}`}>
          <label className={styles.label}>Phone</label>
          <input className={styles.input} value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="+91-xxxxxxxxxx" />
        </div>

        <div className={`${styles.field} ${styles.col}`}>
          <label className={styles.label}>Destination (optional)</label>
          <input className={styles.input} value={form.destination} onChange={e => update('destination', e.target.value)} placeholder="e.g., Goa, Thailand" />
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Message*</label>
        <textarea className={styles.textarea} value={form.message} onChange={e => update('message', e.target.value)} placeholder="Tell us about your trip..." />
      </div>

      <div className={styles.actions}>
        <button type="button" className={styles.btnGhost} onClick={() => setForm({ name: '', email: '', phone: '', destination: '', message: '' })} disabled={loading}>
          Reset
        </button>
        <button type="submit" className={styles.btn} disabled={loading}>
          {loading ? 'Sending...' : 'Send Inquiry'}
        </button>
      </div>

      {notice && (
        <div className={styles.message} style={{ color: notice.type === 'success' ? 'green' : 'crimson' }}>
          {notice.text}
        </div>
      )}
    </form>
  );
}