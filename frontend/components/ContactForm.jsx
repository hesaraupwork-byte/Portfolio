'use client';

import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import toast from 'react-hot-toast';
import { FaFacebookF, FaTiktok, FaInstagram, FaWhatsapp } from 'react-icons/fa6';
import { SiBehance } from 'react-icons/si';
import { HiOutlinePhone, HiOutlineEnvelope, HiOutlineMapPin } from 'react-icons/hi2';
import { contactAPI } from '@/lib/api';
import { FILL_HOVER } from '@/lib/hoverFill';
import Spinner from './Spinner';

const initialForm = { name: '', email: '', message: '' };

const SOCIALS = [
  { icon: FaWhatsapp, label: 'WhatsApp', href: 'https://wa.me/94764162638' },
  { icon: FaFacebookF, label: 'Facebook', href: 'https://www.facebook.com/share/1DTfRDgFR6/' },
  { icon: SiBehance, label: 'Behance', href: 'https://www.behance.net/nadilhesara' },
  
];

const CONTACT_DETAILS = [
  { icon: HiOutlinePhone, text: '076 416 2638', href: 'tel:+94764162638' },
  {
    icon: HiOutlineEnvelope,
    text: 'rathnayakanhesara01@gmail.com',
    href: 'mailto:rathnayakanhesara01@gmail.com',
  },
  { icon: HiOutlineMapPin, text: '29a, Asoka Mawatha, Mount Lavinia', href: null },
];

export default function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const sectionRef = useRef(null);
  const mouseX = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 150, damping: 20, mass: 0.5 });
  const textX = useTransform(springX, [-1, 1], [-12, 12]);
  const iconsX = useTransform(springX, [-1, 1], [-22, 22]);

  const handleMouseMove = (e) => {
    const rect = sectionRef.current.getBoundingClientRect();
    mouseX.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
  };

  const handleMouseLeave = () => mouseX.set(0);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await contactAPI.send(form);
      if (res?.message === 'Message sent successfully') {
        setStatus('sent');
        setForm(initialForm);
        toast.success('Message sent! I’ll get back to you soon.');
      } else {
        setStatus('error');
        toast.error('Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="mx-auto max-w-6xl px-6 py-24"
    >
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="text-5xl font-extrabold tracking-tight uppercase sm:text-7xl"
          >
            <span className="text-[var(--foreground)]">contact</span>{' '}
            <span className="text-[var(--accent)]">me</span>
          </motion.h2>

          <motion.p
            style={{ x: textX }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-8 max-w-sm text-[var(--muted)]"
          >
            Have a project in mind? Reach out through the form, or find me on
            social media.
          </motion.p>

          <motion.div
            style={{ x: textX }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-6 flex flex-col gap-3"
          >
            {CONTACT_DETAILS.map(({ icon: Icon, text, href }) => {
              const content = (
                <>
                  <Icon className="text-lg text-[var(--accent)]" />
                  <span>{text}</span>
                </>
              );
              return href ? (
                <a
                  key={text}
                  href={href}
                  className="flex items-center gap-3 text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
                >
                  {content}
                </a>
              ) : (
                <span
                  key={text}
                  className="flex items-center gap-3 text-sm text-[var(--muted)]"
                >
                  {content}
                </span>
              );
            })}
          </motion.div>

          <motion.div
            style={{ x: iconsX }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 flex gap-4"
          >
            {SOCIALS.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={`flex h-12 w-12 items-center justify-center rounded-full border text-lg hover:border-[var(--accent)] ${
                  label === 'WhatsApp'
                    ? 'border-[var(--accent)] text-[var(--accent)]'
                    : 'border-white/15'
                } ${FILL_HOVER}`}
              >
                <Icon />
              </a>
            ))}
          </motion.div>

          <motion.a
            style={{ x: iconsX }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            href="/resume.pdf"
            download
            className={`mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-white/15 px-5 py-2 text-xs font-medium ${FILL_HOVER}`}
          >
            Download Resume
          </motion.a>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
          <input
            type="text"
            name="name"
            placeholder="Your name"
            value={form.name}
            onChange={handleChange}
            required
            className="rounded-xl border border-white/15 bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-[var(--accent)]"
          />
          <input
            type="email"
            name="email"
            placeholder="Your email"
            value={form.email}
            onChange={handleChange}
            required
            className="rounded-xl border border-white/15 bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-[var(--accent)]"
          />
          <textarea
            name="message"
            placeholder="Tell me about your project…"
            value={form.message}
            onChange={handleChange}
            required
            rows={5}
            className="resize-none rounded-xl border border-white/15 bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-[var(--accent)]"
          />

          <motion.button
            type="submit"
            disabled={status === 'sending'}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-extrabold text-black disabled:opacity-50"
          >
            {status === 'sending' ? (
              <span className="flex h-5 w-10 items-center justify-center">
                <Spinner scale={0.28} dark />
              </span>
            ) : (
              'Send Message'
            )}
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
}
