


// // 'use client';

// // import { useState, useEffect, useRef } from 'react';
// // import { useRouter } from 'next/navigation';
// // import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
// // import { auth } from '@/lib/firebase';

// // const ALLOWED_EMAIL = 'marketcaptura@gmail.com';

// // function EyeIcon({ open }: { open: boolean }) {
// //   return open ? (
// //     <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //       <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
// //     </svg>
// //   ) : (
// //     <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //       <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
// //       <line x1="1" y1="1" x2="23" y2="23" />
// //     </svg>
// //   );
// // }

// // const STATS = [
// //   { val: '150+',  label: 'Brands Served'    },
// //   { val: '3.8×',  label: 'Avg ROI'          },
// //   { val: '98%',   label: 'Client Retention' },
// // ];

// // export default function LoginPage() {
// //   const router   = useRouter();
// //   const [email,    setEmail]    = useState('');
// //   const [password, setPassword] = useState('');
// //   const [showPw,   setShowPw]   = useState(false);
// //   const [loading,  setLoading]  = useState(false);
// //   const [error,    setError]    = useState('');
// //   const [checking, setChecking] = useState(true);
// //   const [mounted,  setMounted]  = useState(false);
// //   const emailRef = useRef<HTMLInputElement>(null);

// //   useEffect(() => {
// //     setMounted(true);
// //     const unsub = onAuthStateChanged(auth, user => {
// //       if (user && user.email === ALLOWED_EMAIL) {
// //         router.replace('/admin');
// //       } else {
// //         setChecking(false);
// //         setTimeout(() => emailRef.current?.focus(), 300);
// //       }
// //     });
// //     return unsub;
// //   }, [router]);

// //   const handleLogin = async () => {
// //     setError('');
// //     if (!email.trim()) { setError('Please enter your email address.'); return; }
// //     if (!password)     { setError('Please enter your password.'); return; }
// //     if (email.trim().toLowerCase() !== ALLOWED_EMAIL) {
// //       setError('Access denied. This portal is restricted to authorized users only.');
// //       return;
// //     }
// //     setLoading(true);
// //     try {
// //       await signInWithEmailAndPassword(auth, email.trim(), password);
// //       router.replace('/admin');
// //     } catch (e: unknown) {
// //       const code = (e as { code?: string })?.code ?? '';
// //       if (['auth/wrong-password', 'auth/invalid-credential'].includes(code)) {
// //         setError('Incorrect password. Please try again.');
// //       } else if (code === 'auth/user-not-found') {
// //         setError('No account found with this email.');
// //       } else if (code === 'auth/too-many-requests') {
// //         setError('Too many failed attempts. Please wait and try again.');
// //       } else {
// //         setError('Login failed. Please check your credentials and try again.');
// //       }
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const onKey = (e: React.KeyboardEvent) => { if (e.key === 'Enter') handleLogin(); };

// //   // ── Auth-check spinner ─────────────────────────────────────────────────────
// //   if (checking) {
// //     return (
// //       <div style={{
// //         minHeight: '100vh',
// //         background: 'linear-gradient(160deg, #EEF3FC 0%, #F5F8FF 50%, #EBF0FA 100%)',
// //         display: 'flex', alignItems: 'center', justifyContent: 'center',
// //       }}>
// //         <div style={{
// //           width: 36, height: 36, borderRadius: '50%',
// //           border: '3px solid rgba(35,82,255,0.15)',
// //           borderTop: '3px solid #2352FF',
// //           animation: 'spin 0.8s linear infinite',
// //         }} />
// //         <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
// //       </div>
// //     );
// //   }

// //   return (
// //     <>
// //       <style>{`
// //         @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap');
// //         *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

// //         @keyframes mxFadeUp {
// //           from { opacity: 0; transform: translateY(24px); }
// //           to   { opacity: 1; transform: translateY(0);    }
// //         }
// //         @keyframes mxFadeLeft {
// //           from { opacity: 0; transform: translateX(36px); }
// //           to   { opacity: 1; transform: translateX(0);    }
// //         }
// //         @keyframes mxFloat {
// //           0%, 100% { transform: translateY(0);    }
// //           50%       { transform: translateY(-9px); }
// //         }
// //         @keyframes mxSpin {
// //           from { transform: rotate(0deg);   }
// //           to   { transform: rotate(360deg); }
// //         }
// //         @keyframes spin { to { transform: rotate(360deg); } }

// //         .mc-input {
// //           transition: border-color 0.18s, box-shadow 0.18s, background 0.18s;
// //           outline: none;
// //         }
// //         .mc-input:focus {
// //           border-color: #2352FF !important;
// //           box-shadow: 0 0 0 4px rgba(35,82,255,0.08) !important;
// //           background: #fff !important;
// //         }
// //         .mc-btn {
// //           transition: transform 0.2s, box-shadow 0.2s, background 0.2s;
// //         }
// //         .mc-btn:hover:not(:disabled) {
// //           transform: scale(1.03);
// //           box-shadow: 0 8px 28px rgba(35,82,255,0.35) !important;
// //         }
// //         .mc-btn:active:not(:disabled) { transform: scale(0.98); }

// //         .mc-eye:hover { color: #2352FF !important; }

// //         .login-grid {
// //           display: flex;
// //           align-items: center;
// //           min-height: 100vh;
// //         }

// //         @media (max-width: 860px) {
// //           .login-grid { flex-direction: column !important; }
// //           .login-left { display: none !important; }
// //           .login-right {
// //             border-radius: 0 !important;
// //             min-height: 100vh !important;
// //             width: 100% !important;
// //             box-shadow: none !important;
// //           }
// //         }
// //       `}</style>

// //       {/* ── Fixed background matching hero ── */}
// //       <div style={{
// //         position: 'fixed', inset: 0, zIndex: -1,
// //         background: 'linear-gradient(160deg, #EEF3FC 0%, #F5F8FF 50%, #EBF0FA 100%)',
// //       }} />

// //       <div
// //         className="login-grid"
// //         style={{
// //           fontFamily: 'Syne, sans-serif',
// //           position: 'relative',
// //           overflow: 'hidden',
// //         }}
// //       >
// //         {/* ── Same subtle grid as hero ── */}
// //         <div style={{
// //           position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
// //           backgroundImage: `
// //             linear-gradient(rgba(35,82,255,0.04) 1px, transparent 1px),
// //             linear-gradient(90deg, rgba(35,82,255,0.04) 1px, transparent 1px)
// //           `,
// //           backgroundSize: '60px 60px',
// //         }} />

// //         {/* ── Ambient blobs matching hero ── */}
// //         <div style={{
// //           position: 'absolute', width: 500, height: 500, borderRadius: '50%',
// //           background: 'radial-gradient(circle, rgba(35,82,255,0.08) 0%, transparent 70%)',
// //           top: -100, left: -100, zIndex: 0, pointerEvents: 'none',
// //         }} />
// //         <div style={{
// //           position: 'absolute', width: 400, height: 400, borderRadius: '50%',
// //           background: 'radial-gradient(circle, rgba(255,79,23,0.06) 0%, transparent 70%)',
// //           bottom: -80, right: '30%', zIndex: 0, pointerEvents: 'none',
// //         }} />

// //         {/* ════════════════════════════════════════════════════════════════
// //             LEFT — Brand Panel (mirrors hero left column language)
// //         ════════════════════════════════════════════════════════════════ */}
// //         <div
// //           className="login-left"
// //           style={{
// //             flex: '1 1 52%',
// //             maxWidth: 580,
// //             display: 'flex',
// //             flexDirection: 'column',
// //             justifyContent: 'center',
// //             padding: '60px 52px 60px 60px',
// //             position: 'relative',
// //             zIndex: 1,
// //             animation: mounted ? 'mxFadeUp 0.7s 0.1s ease both' : 'none',
// //           }}
// //         >
// //           {/* Badge — matches hero badge exactly */}
// //           <div style={{
// //             display: 'inline-flex', alignItems: 'center', gap: 8,
// //             background: '#fff',
// //             border: '1.5px solid #E4ECF7',
// //             borderRadius: 60,
// //             padding: '7px 18px 7px 12px',
// //             marginBottom: 32,
// //             boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
// //             width: 'fit-content',
// //           }}>
// //             <span style={{ fontSize: 15 }}>⭐</span>
// //             <span style={{
// //               fontSize: '0.76rem', fontWeight: 700, color: '#0D1B3E',
// //               letterSpacing: '0.07em', textTransform: 'uppercase',
// //             }}>
// //               India&apos;s Next-Gen Marketing Agency
// //             </span>
// //           </div>

// //           {/* Logo wordmark */}
// //           <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 36 }}>
// //             <div style={{
// //               width: 46, height: 46, borderRadius: 14,
// //               background: 'linear-gradient(135deg,#2352FF,#1a3fd4)',
// //               display: 'flex', alignItems: 'center', justifyContent: 'center',
// //               boxShadow: '0 6px 20px rgba(35,82,255,0.28)',
// //               fontSize: 20, fontWeight: 800, color: '#fff',
// //             }}>M</div>
// //             <span style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.025em', color: '#0D1B3E' }}>
// //               Market<span style={{ color: '#FF4F17' }}>Captura</span>
// //             </span>
// //           </div>

// //           {/* Headline — same structure as hero h1 */}
// //           <h1 style={{
// //             fontSize: 'clamp(2rem, 3.5vw, 3rem)',
// //             fontWeight: 800, lineHeight: 1.08,
// //             color: '#0D1B3E',
// //             letterSpacing: '-0.025em',
// //             marginBottom: 20,
// //           }}>
// //             Admin Portal<br />
// //             <span style={{ color: '#2352FF', display: 'inline-block', position: 'relative' }}>
// //               Manage &amp; Monitor
// //               <svg viewBox="0 0 220 12" xmlns="http://www.w3.org/2000/svg"
// //                 style={{ position: 'absolute', bottom: -6, left: 0, width: '100%', height: 8, opacity: 0.4 }}>
// //                 <path d="M2 8 Q55 2 110 8 Q165 14 218 8"
// //                   stroke="#2352FF" strokeWidth="3" fill="none" strokeLinecap="round" />
// //               </svg>
// //             </span>
// //             <br />
// //             <span style={{ color: '#2352FF' }}>Brand Growth</span>
// //           </h1>

// //           {/* Subtext */}
// //           <p style={{
// //             fontSize: '1rem', color: '#6B7280', lineHeight: 1.8,
// //             marginBottom: 40, maxWidth: 460,
// //           }}>
// //             Access leads, track campaigns, and monitor brand growth —
// //             all from one{' '}
// //             <strong style={{ color: '#0D1B3E', fontWeight: 600 }}>
// //               powerful dashboard
// //             </strong>.
// //           </p>

// //           {/* Stats strip — identical to hero */}
// //           <div style={{
// //             display: 'flex', gap: 36,
// //             paddingTop: 32, borderTop: '1px solid #E4ECF7',
// //             flexWrap: 'wrap',
// //           }}>
// //             {STATS.map(s => (
// //               <div key={s.label}>
// //                 <div style={{
// //                   fontSize: 'clamp(1.5rem,2.5vw,2rem)',
// //                   fontWeight: 800, color: '#0D1B3E',
// //                   letterSpacing: '-0.02em', lineHeight: 1,
// //                 }}>{s.val}</div>
// //                 <div style={{ fontSize: '0.78rem', color: '#9AA5B4', marginTop: 5, fontWeight: 500 }}>
// //                   {s.label}
// //                 </div>
// //               </div>
// //             ))}
// //           </div>

// //           {/* Floating card — same style as hero "Latest Projects" badge */}
// //           <div style={{ position: 'relative', marginTop: 52, height: 100 }}>
// //             {/* ROI badge */}
// //             <div style={{
// //               position: 'absolute', top: 0, left: 0,
// //               background: '#fff',
// //               border: '1.5px solid #E4ECF7',
// //               borderRadius: 16,
// //               padding: '12px 18px',
// //               display: 'flex', alignItems: 'center', gap: 12,
// //               boxShadow: '0 8px 32px rgba(35,82,255,0.10)',
// //               animation: 'mxFloat 4s ease-in-out infinite',
// //             }}>
// //               <div style={{
// //                 width: 36, height: 36, borderRadius: 11,
// //                 background: 'linear-gradient(135deg,#2352FF,#1a3fd4)',
// //                 display: 'flex', alignItems: 'center', justifyContent: 'center',
// //                 fontSize: 16,
// //               }}>📈</div>
// //               <div>
// //                 <div style={{ fontSize: '0.65rem', color: '#9AA5B4', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Avg ROI</div>
// //                 <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0D1B3E', letterSpacing: '-0.02em', lineHeight: 1 }}>3.8×</div>
// //               </div>
// //             </div>

// //             {/* Brands badge */}
// //             <div style={{
// //               position: 'absolute', top: 12, left: 200,
// //               background: '#fff',
// //               border: '1.5px solid #E4ECF7',
// //               borderRadius: 14,
// //               padding: '10px 16px',
// //               display: 'flex', alignItems: 'center', gap: 10,
// //               boxShadow: '0 8px 32px rgba(35,82,255,0.08)',
// //               animation: 'mxFloat 4s ease-in-out infinite 1.6s',
// //             }}>
// //               <div style={{ display: 'flex' }}>
// //                 {['#2352FF', '#FF4F17', '#22C55E'].map((c, i) => (
// //                   <div key={i} style={{
// //                     width: 22, height: 22, borderRadius: '50%',
// //                     background: c,
// //                     border: '2px solid #fff',
// //                     marginLeft: i > 0 ? -8 : 0,
// //                   }} />
// //                 ))}
// //               </div>
// //               <div>
// //                 <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#0D1B3E' }}>150+ Brands</div>
// //                 <div style={{ fontSize: '0.65rem', color: '#9AA5B4', marginTop: 1 }}>Trust MarketCaptura</div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         {/* ════════════════════════════════════════════════════════════════
// //             RIGHT — Login Card
// //         ════════════════════════════════════════════════════════════════ */}
// //         <div
// //           className="login-right"
// //           style={{
// //             width: 'min(480px, 100%)',
// //             display: 'flex', alignItems: 'center', justifyContent: 'center',
// //             padding: '52px 40px',
// //             background: '#fff',
// //             borderRadius: '32px 0 0 32px',
// //             boxShadow: '-20px 0 70px rgba(35,82,255,0.07), -2px 0 0 #E4ECF7',
// //             position: 'relative', zIndex: 2, minHeight: '100vh',
// //             animation: mounted ? 'mxFadeLeft 0.7s 0.15s ease both' : 'none',
// //           }}
// //         >
// //           <div style={{ width: '100%', maxWidth: 380 }}>

// //             {/* Accent bar — hero uses same brand colors */}
// //             <div style={{ width: 48, height: 4, borderRadius: 60, background: 'linear-gradient(90deg,#2352FF,#FF4F17)', marginBottom: 32 }} />

// //             {/* Admin pill badge */}
// //             <div style={{
// //               display: 'inline-flex', alignItems: 'center', gap: 8,
// //               background: 'rgba(35,82,255,0.06)',
// //               border: '1.5px solid rgba(35,82,255,0.15)',
// //               borderRadius: 60, padding: '5px 14px 5px 10px',
// //               marginBottom: 20,
// //             }}>
// //               <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#2352FF', display: 'inline-block' }} />
// //               <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#2352FF', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
// //                 Admin Portal
// //               </span>
// //             </div>

// //             <h2 style={{
// //               fontSize: 'clamp(1.7rem,2.5vw,2.2rem)',
// //               fontWeight: 800, letterSpacing: '-0.035em',
// //               color: '#0D1B3E', lineHeight: 1.1, marginBottom: 8,
// //             }}>
// //               Welcome back
// //             </h2>
// //             <p style={{ color: '#6B7280', fontSize: '0.88rem', lineHeight: 1.7, marginBottom: 32 }}>
// //               Sign in to access your MarketCaptura admin dashboard.
// //             </p>

// //             {/* Error banner */}
// //             {error && (
// //               <div style={{
// //                 padding: '11px 14px', borderRadius: 12, marginBottom: 20,
// //                 background: 'rgba(255,79,23,0.06)',
// //                 border: '1.5px solid rgba(255,79,23,0.2)',
// //                 color: '#C0370A', fontSize: '0.83rem', fontWeight: 600,
// //                 display: 'flex', alignItems: 'flex-start', gap: 8,
// //               }}>
// //                 <span style={{ flexShrink: 0, marginTop: 1 }}>⚠</span>
// //                 <span>{error}</span>
// //               </div>
// //             )}

// //             {/* Email */}
// //             <div style={{ marginBottom: 14 }}>
// //               <label style={{
// //                 display: 'block', fontSize: '0.74rem', fontWeight: 700,
// //                 color: '#0D1B3E', letterSpacing: '0.05em',
// //                 textTransform: 'uppercase', marginBottom: 7,
// //               }}>
// //                 Email Address
// //               </label>
// //               <input
// //                 ref={emailRef}
// //                 className="mc-input"
// //                 type="email"
// //                 value={email}
// //                 onChange={e => setEmail(e.target.value)}
// //                 onKeyDown={onKey}
// //                 placeholder="marketcaptura@gmail.com"
// //                 autoComplete="email"
// //                 style={{
// //                   width: '100%', padding: '13px 16px',
// //                   border: '1.5px solid #E4ECF7', borderRadius: 14,
// //                   fontSize: '0.91rem', color: '#0D1B3E',
// //                   fontFamily: 'Syne, sans-serif',
// //                   background: '#FAFCFF',
// //                 }}
// //               />
// //             </div>

// //             {/* Password */}
// //             <div style={{ marginBottom: 28 }}>
// //               <label style={{
// //                 display: 'block', fontSize: '0.74rem', fontWeight: 700,
// //                 color: '#0D1B3E', letterSpacing: '0.05em',
// //                 textTransform: 'uppercase', marginBottom: 7,
// //               }}>
// //                 Password
// //               </label>
// //               <div style={{ position: 'relative' }}>
// //                 <input
// //                   className="mc-input"
// //                   type={showPw ? 'text' : 'password'}
// //                   value={password}
// //                   onChange={e => setPassword(e.target.value)}
// //                   onKeyDown={onKey}
// //                   placeholder="Enter your password"
// //                   autoComplete="current-password"
// //                   style={{
// //                     width: '100%', padding: '13px 48px 13px 16px',
// //                     border: '1.5px solid #E4ECF7', borderRadius: 14,
// //                     fontSize: '0.91rem', color: '#0D1B3E',
// //                     fontFamily: 'Syne, sans-serif',
// //                     background: '#FAFCFF',
// //                   }}
// //                 />
// //                 <button
// //                   type="button"
// //                   className="mc-eye"
// //                   onClick={() => setShowPw(v => !v)}
// //                   style={{
// //                     position: 'absolute', right: 14, top: '50%',
// //                     transform: 'translateY(-50%)',
// //                     background: 'none', border: 'none', cursor: 'pointer',
// //                     color: '#9AA5B4', display: 'flex', alignItems: 'center',
// //                     padding: 2, transition: 'color 0.18s',
// //                   }}
// //                 >
// //                   <EyeIcon open={showPw} />
// //                 </button>
// //               </div>
// //             </div>

// //             {/* Submit — matches hero primary CTA exactly */}
// //             <button
// //               className="mc-btn"
// //               onClick={handleLogin}
// //               disabled={loading}
// //               style={{
// //                 width: '100%',
// //                 background: loading ? '#C8D3F5' : 'linear-gradient(135deg,#2352FF,#1a3fd4)',
// //                 color: '#fff', border: 'none', borderRadius: 60,
// //                 padding: '15px 24px',
// //                 fontSize: '0.96rem', fontWeight: 700,
// //                 cursor: loading ? 'not-allowed' : 'pointer',
// //                 letterSpacing: '-0.01em', fontFamily: 'Syne, sans-serif',
// //                 boxShadow: loading ? 'none' : '0 4px 16px rgba(35,82,255,0.25)',
// //                 display: 'flex', alignItems: 'center',
// //                 justifyContent: 'center', gap: 10,
// //               }}
// //             >
// //               {loading ? (
// //                 <>
// //                   <div style={{
// //                     width: 18, height: 18, borderRadius: '50%',
// //                     border: '2.5px solid rgba(255,255,255,0.3)',
// //                     borderTop: '2.5px solid #fff',
// //                     animation: 'spin 0.75s linear infinite',
// //                   }} />
// //                   Signing in…
// //                 </>
// //               ) : (
// //                 <>Sign In to Dashboard →</>
// //               )}
// //             </button>

// //             {/* Security note */}
// //             <p style={{ textAlign: 'center', marginTop: 20, color: '#9AA5B4', fontSize: '0.76rem', lineHeight: 1.6 }}>
// //               🔒 Restricted access · MarketCaptura internal only
// //             </p>

// //             {/* Brand footer — matches hero trust strip */}
// //             <div style={{
// //               display: 'flex', alignItems: 'center',
// //               justifyContent: 'center', gap: 12,
// //               marginTop: 36, paddingTop: 22,
// //               borderTop: '1px solid #E4ECF7',
// //               flexWrap: 'wrap',
// //             }}>
// //               <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
// //                 <span style={{ fontSize: 16 }}>⭐</span>
// //                 <span style={{ fontSize: '0.8rem', color: '#0D1B3E', fontWeight: 600 }}>
// //                   4.8★ Rating | 150+ Projects
// //                 </span>
// //               </div>
// //               <div style={{ width: 1, height: 18, background: '#E4ECF7' }} />
// //               <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
// //                 <span style={{ fontSize: '0.95rem' }}>🇮🇳</span>
// //                 <span style={{ fontSize: '0.8rem', color: '#0D1B3E', fontWeight: 600 }}>
// //                   India Registered Company
// //                 </span>
// //               </div>
// //             </div>

// //           </div>
// //         </div>
// //       </div>
// //     </>
// //   );
// // }





// // 'use client';

// // import { useState, useEffect, useRef } from 'react';
// // import { useRouter } from 'next/navigation';
// // import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
// // import { auth } from '@/lib/firebase';

// // const ALLOWED_EMAIL = 'marketcaptura@gmail.com';

// // function EyeIcon({ open }: { open: boolean }) {
// //   return open ? (
// //     <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //       <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
// //     </svg>
// //   ) : (
// //     <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //       <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
// //       <line x1="1" y1="1" x2="23" y2="23" />
// //     </svg>
// //   );
// // }

// // const STATS = [
// //   { val: '150+', label: 'Brands Served' },
// //   { val: '3.8×', label: 'Avg ROI' },
// //   { val: '98%',  label: 'Client Retention' },
// // ];

// // export default function LoginPage() {
// //   const router   = useRouter();
// //   const [email,    setEmail]    = useState('');
// //   const [password, setPassword] = useState('');
// //   const [showPw,   setShowPw]   = useState(false);
// //   const [loading,  setLoading]  = useState(false);
// //   const [error,    setError]    = useState('');
// //   const [checking, setChecking] = useState(true);
// //   const [mounted,  setMounted]  = useState(false);
// //   const emailRef = useRef<HTMLInputElement>(null);

// //   useEffect(() => {
// //     setMounted(true);
// //     const unsub = onAuthStateChanged(auth, user => {
// //       if (user && user.email === ALLOWED_EMAIL) {
// //         router.replace('/admin');
// //       } else {
// //         setChecking(false);
// //         setTimeout(() => emailRef.current?.focus(), 300);
// //       }
// //     });
// //     return unsub;
// //   }, [router]);

// //   const handleLogin = async () => {
// //     setError('');
// //     if (!email.trim()) { setError('Please enter your email address.'); return; }
// //     if (!password)     { setError('Please enter your password.'); return; }
// //     if (email.trim().toLowerCase() !== ALLOWED_EMAIL) {
// //       setError('Access denied. This portal is restricted to authorized users only.');
// //       return;
// //     }
// //     setLoading(true);
// //     try {
// //       await signInWithEmailAndPassword(auth, email.trim(), password);
// //       router.replace('/admin');
// //     } catch (e: unknown) {
// //       const code = (e as { code?: string })?.code ?? '';
// //       if (['auth/wrong-password', 'auth/invalid-credential'].includes(code)) {
// //         setError('Incorrect password. Please try again.');
// //       } else if (code === 'auth/user-not-found') {
// //         setError('No account found with this email.');
// //       } else if (code === 'auth/too-many-requests') {
// //         setError('Too many failed attempts. Please wait and try again.');
// //       } else {
// //         setError('Login failed. Please check your credentials and try again.');
// //       }
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const onKey = (e: React.KeyboardEvent) => { if (e.key === 'Enter') handleLogin(); };

// //   if (checking) {
// //     return (
// //       <div style={{
// //         minHeight: '100vh',
// //         background: 'linear-gradient(160deg, #EEF3FC 0%, #F5F8FF 50%, #EBF0FA 100%)',
// //         display: 'flex', alignItems: 'center', justifyContent: 'center',
// //         fontFamily: 'Syne, sans-serif',
// //       }}>
// //         <div style={{
// //           display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16,
// //         }}>
// //           <div style={{
// //             width: 40, height: 40, borderRadius: '50%',
// //             border: '3px solid rgba(35,82,255,0.15)',
// //             borderTop: '3px solid #2352FF',
// //             animation: 'spin 0.8s linear infinite',
// //           }} />
// //           <span style={{ fontSize: '0.78rem', color: '#9AA5B4', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
// //             Verifying session…
// //           </span>
// //         </div>
// //         <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
// //       </div>
// //     );
// //   }

// //   return (
// //     <>
// //       <style>{`
// //         @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap');
// //         *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

// //         @keyframes mxFadeUp {
// //           from { opacity: 0; transform: translateY(28px); }
// //           to   { opacity: 1; transform: translateY(0);    }
// //         }
// //         @keyframes mxFadeRight {
// //           from { opacity: 0; transform: translateX(-32px); }
// //           to   { opacity: 1; transform: translateX(0);     }
// //         }
// //         @keyframes mxFloat {
// //           0%, 100% { transform: translateY(0);    }
// //           50%       { transform: translateY(-9px); }
// //         }
// //         @keyframes mxSpin {
// //           from { transform: rotate(0deg);   }
// //           to   { transform: rotate(360deg); }
// //         }
// //         @keyframes spin { to { transform: rotate(360deg); } }
// //         @keyframes shimmer {
// //           0%   { background-position: -200% center; }
// //           100% { background-position: 200% center;  }
// //         }
// //         @keyframes pulseRing {
// //           0%   { transform: scale(1);   opacity: 0.6; }
// //           100% { transform: scale(1.5); opacity: 0;   }
// //         }

// //         .mc-input {
// //           transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
// //           outline: none;
// //           font-family: 'Syne', sans-serif;
// //         }
// //         .mc-input:focus {
// //           border-color: #2352FF !important;
// //           box-shadow: 0 0 0 4px rgba(35,82,255,0.10) !important;
// //           background: #ffffff !important;
// //         }
// //         .mc-input::placeholder { color: #C4CDD9; }

// //         .mc-btn {
// //           transition: transform 0.22s, box-shadow 0.22s, background 0.22s;
// //           font-family: 'Syne', sans-serif;
// //         }
// //         .mc-btn:hover:not(:disabled) {
// //           transform: translateY(-2px) scale(1.02);
// //           box-shadow: 0 12px 32px rgba(35,82,255,0.32) !important;
// //         }
// //         .mc-btn:active:not(:disabled) { transform: scale(0.98); }

// //         .mc-eye { transition: color 0.18s; }
// //         .mc-eye:hover { color: #2352FF !important; }

// //         .stat-card:hover {
// //           transform: translateY(-4px);
// //           box-shadow: 0 12px 32px rgba(35,82,255,0.12) !important;
// //         }

// //         .login-wrap {
// //           display: flex;
// //           min-height: 100vh;
// //         }

// //         @media (max-width: 900px) {
// //           .login-left-panel { display: none !important; }
// //           .login-right-panel {
// //             width: 100% !important;
// //             border-radius: 0 !important;
// //             padding: 40px 24px !important;
// //           }
// //         }
// //       `}</style>

// //       {/* Fixed background */}
// //       <div style={{
// //         position: 'fixed', inset: 0, zIndex: -1,
// //         background: 'linear-gradient(160deg, #EEF3FC 0%, #F5F8FF 50%, #EBF0FA 100%)',
// //       }} />

// //       {/* Grid overlay */}
// //       <div style={{
// //         position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
// //         backgroundImage: `
// //           linear-gradient(rgba(35,82,255,0.04) 1px, transparent 1px),
// //           linear-gradient(90deg, rgba(35,82,255,0.04) 1px, transparent 1px)
// //         `,
// //         backgroundSize: '60px 60px',
// //       }} />

// //       <div className="login-wrap" style={{ fontFamily: 'Syne, sans-serif', position: 'relative' }}>

// //         {/* ══════════════════════════════════════════════
// //             LEFT PANEL — brand storytelling
// //         ══════════════════════════════════════════════ */}
// //         <div
// //           className="login-left-panel"
// //           style={{
// //             flex: '1 1 55%',
// //             display: 'flex',
// //             flexDirection: 'column',
// //             justifyContent: 'center',
// //             padding: '60px 56px 60px 64px',
// //             position: 'relative',
// //             zIndex: 1,
// //             animation: mounted ? 'mxFadeRight 0.7s 0.1s ease both' : 'none',
// //           }}
// //         >
// //           {/* Ambient blobs */}
// //           <div style={{
// //             position: 'absolute', width: 480, height: 480, borderRadius: '50%',
// //             background: 'radial-gradient(circle, rgba(35,82,255,0.09) 0%, transparent 70%)',
// //             top: -120, left: -120, pointerEvents: 'none',
// //           }} />
// //           <div style={{
// //             position: 'absolute', width: 360, height: 360, borderRadius: '50%',
// //             background: 'radial-gradient(circle, rgba(255,79,23,0.07) 0%, transparent 70%)',
// //             bottom: -80, right: '10%', pointerEvents: 'none',
// //           }} />

// //           {/* Logo */}
// //           <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 44 }}>
// //             <div style={{
// //               width: 48, height: 48, borderRadius: 15,
// //               background: 'linear-gradient(135deg, #2352FF, #1a3fd4)',
// //               display: 'flex', alignItems: 'center', justifyContent: 'center',
// //               boxShadow: '0 8px 24px rgba(35,82,255,0.30)',
// //               fontSize: 22, fontWeight: 800, color: '#fff',
// //               position: 'relative',
// //             }}>
// //               M
// //               {/* Pulse ring */}
// //               <div style={{
// //                 position: 'absolute', inset: -2, borderRadius: 17,
// //                 border: '2px solid rgba(35,82,255,0.4)',
// //                 animation: 'pulseRing 2s ease-out infinite',
// //               }} />
// //             </div>
// //             <span style={{ fontSize: '1.3rem', fontWeight: 800, letterSpacing: '-0.03em', color: '#0D1B3E' }}>
// //               Market<span style={{ color: '#FF4F17' }}>Captura</span>
// //             </span>
// //           </div>

// //           {/* Badge */}
// //           <div style={{
// //             display: 'inline-flex', alignItems: 'center', gap: 8,
// //             background: '#fff',
// //             border: '1.5px solid #E4ECF7',
// //             borderRadius: 60,
// //             padding: '7px 18px 7px 12px',
// //             marginBottom: 28,
// //             boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
// //             width: 'fit-content',
// //           }}>
// //             <span style={{ fontSize: 14 }}>⭐</span>
// //             <span style={{ fontSize: '0.73rem', fontWeight: 700, color: '#0D1B3E', letterSpacing: '0.07em', textTransform: 'uppercase' }}>
// //               India&apos;s Next-Gen Marketing Agency
// //             </span>
// //           </div>

// //           {/* Headline */}
// //           <h1 style={{
// //             fontSize: 'clamp(2.1rem, 3.6vw, 3.1rem)',
// //             fontWeight: 800,
// //             lineHeight: 1.09,
// //             color: '#0D1B3E',
// //             letterSpacing: '-0.03em',
// //             marginBottom: 18,
// //           }}>
// //             Your Command<br />
// //             Centre for{' '}
// //             <span style={{ color: '#2352FF', display: 'inline-block', position: 'relative' }}>
// //               Brand Growth
// //               <svg viewBox="0 0 220 12" xmlns="http://www.w3.org/2000/svg"
// //                 style={{ position: 'absolute', bottom: -5, left: 0, width: '100%', height: 8, opacity: 0.45 }}>
// //                 <path d="M2 8 Q55 2 110 8 Q165 14 218 8"
// //                   stroke="#2352FF" strokeWidth="3" fill="none" strokeLinecap="round" />
// //               </svg>
// //             </span>
// //           </h1>

// //           <p style={{
// //             fontSize: '0.97rem', color: '#6B7280', lineHeight: 1.8,
// //             marginBottom: 40, maxWidth: 480,
// //           }}>
// //             Access leads, track campaigns, and monitor performance — all from one{' '}
// //             <strong style={{ color: '#0D1B3E', fontWeight: 700 }}>powerful dashboard</strong>.
// //           </p>

// //           {/* Stat cards */}
// //           <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 44 }}>
// //             {STATS.map((s, i) => (
// //               <div
// //                 key={s.label}
// //                 className="stat-card"
// //                 style={{
// //                   background: '#fff',
// //                   border: '1.5px solid #E4ECF7',
// //                   borderRadius: 18,
// //                   padding: '18px 22px',
// //                   boxShadow: '0 4px 16px rgba(35,82,255,0.07)',
// //                   minWidth: 110,
// //                   transition: 'transform 0.22s, box-shadow 0.22s',
// //                   animation: mounted ? `mxFadeUp 0.6s ${0.3 + i * 0.1}s ease both` : 'none',
// //                 }}
// //               >
// //                 <div style={{
// //                   fontSize: 'clamp(1.4rem, 2vw, 1.8rem)',
// //                   fontWeight: 800, color: '#0D1B3E',
// //                   letterSpacing: '-0.025em', lineHeight: 1,
// //                 }}>{s.val}</div>
// //                 <div style={{ fontSize: '0.72rem', color: '#9AA5B4', marginTop: 5, fontWeight: 600, letterSpacing: '0.03em' }}>
// //                   {s.label}
// //                 </div>
// //               </div>
// //             ))}
// //           </div>

// //           {/* Floating activity badges */}
// //           <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
// //             {/* ROI badge */}
// //             <div style={{
// //               background: '#fff',
// //               border: '1.5px solid #E4ECF7',
// //               borderRadius: 16,
// //               padding: '12px 18px',
// //               display: 'flex', alignItems: 'center', gap: 12,
// //               boxShadow: '0 6px 24px rgba(35,82,255,0.09)',
// //               animation: 'mxFloat 4s ease-in-out infinite',
// //             }}>
// //               <div style={{
// //                 width: 38, height: 38, borderRadius: 12,
// //                 background: 'linear-gradient(135deg, #2352FF, #1a3fd4)',
// //                 display: 'flex', alignItems: 'center', justifyContent: 'center',
// //                 fontSize: 17,
// //               }}>📈</div>
// //               <div>
// //                 <div style={{ fontSize: '0.62rem', color: '#9AA5B4', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em' }}>Avg ROI</div>
// //                 <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0D1B3E', letterSpacing: '-0.02em' }}>3.8×</div>
// //               </div>
// //             </div>

// //             {/* Brands badge */}
// //             <div style={{
// //               background: '#fff',
// //               border: '1.5px solid #E4ECF7',
// //               borderRadius: 16,
// //               padding: '12px 18px',
// //               display: 'flex', alignItems: 'center', gap: 12,
// //               boxShadow: '0 6px 24px rgba(35,82,255,0.07)',
// //               animation: 'mxFloat 4.5s ease-in-out infinite 1.2s',
// //             }}>
// //               <div style={{ display: 'flex' }}>
// //                 {['#2352FF', '#FF4F17', '#22C55E'].map((c, i) => (
// //                   <div key={i} style={{
// //                     width: 24, height: 24, borderRadius: '50%',
// //                     background: c, border: '2px solid #fff',
// //                     marginLeft: i > 0 ? -9 : 0,
// //                   }} />
// //                 ))}
// //               </div>
// //               <div>
// //                 <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0D1B3E' }}>150+ Brands</div>
// //                 <div style={{ fontSize: '0.65rem', color: '#9AA5B4', marginTop: 2 }}>Trust MarketCaptura</div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         {/* ══════════════════════════════════════════════
// //             RIGHT PANEL — login form
// //         ══════════════════════════════════════════════ */}
// //         <div
// //           className="login-right-panel"
// //           style={{
// //             width: 'min(500px, 100%)',
// //             background: '#fff',
// //             borderRadius: '36px 0 0 36px',
// //             boxShadow: '-24px 0 80px rgba(35,82,255,0.08), -1px 0 0 #E8EEF8',
// //             display: 'flex',
// //             alignItems: 'center',
// //             justifyContent: 'center',
// //             padding: '56px 44px',
// //             position: 'relative',
// //             zIndex: 2,
// //             minHeight: '100vh',
// //             animation: mounted ? 'mxFadeUp 0.7s 0.15s ease both' : 'none',
// //           }}
// //         >
// //           {/* Subtle inner gradient */}
// //           <div style={{
// //             position: 'absolute', inset: 0,
// //             borderRadius: '36px 0 0 36px',
// //             background: 'linear-gradient(180deg, rgba(235,240,255,0.4) 0%, rgba(255,255,255,0) 40%)',
// //             pointerEvents: 'none',
// //           }} />

// //           <div style={{ width: '100%', maxWidth: 390, position: 'relative' }}>

// //             {/* Accent bar */}
// //             <div style={{
// //               width: 52, height: 4, borderRadius: 60,
// //               background: 'linear-gradient(90deg, #2352FF, #FF4F17)',
// //               marginBottom: 30,
// //             }} />

// //             {/* Admin pill */}
// //             <div style={{
// //               display: 'inline-flex', alignItems: 'center', gap: 8,
// //               background: 'rgba(35,82,255,0.07)',
// //               border: '1.5px solid rgba(35,82,255,0.16)',
// //               borderRadius: 60,
// //               padding: '5px 14px 5px 10px',
// //               marginBottom: 18,
// //             }}>
// //               <span style={{
// //                 width: 7, height: 7, borderRadius: '50%',
// //                 background: '#2352FF',
// //                 display: 'inline-block',
// //                 boxShadow: '0 0 0 3px rgba(35,82,255,0.2)',
// //               }} />
// //               <span style={{
// //                 fontSize: '0.69rem', fontWeight: 700,
// //                 color: '#2352FF', letterSpacing: '0.09em',
// //                 textTransform: 'uppercase',
// //               }}>
// //                 Admin Portal
// //               </span>
// //             </div>

// //             <h2 style={{
// //               fontSize: 'clamp(1.8rem, 2.6vw, 2.3rem)',
// //               fontWeight: 800,
// //               letterSpacing: '-0.035em',
// //               color: '#0D1B3E',
// //               lineHeight: 1.08,
// //               marginBottom: 10,
// //             }}>
// //               Welcome back 👋
// //             </h2>
// //             <p style={{
// //               color: '#8A94A6',
// //               fontSize: '0.88rem',
// //               lineHeight: 1.75,
// //               marginBottom: 32,
// //               fontWeight: 500,
// //             }}>
// //               Sign in to your MarketCaptura dashboard.
// //             </p>

// //             {/* Error banner */}
// //             {error && (
// //               <div style={{
// //                 padding: '12px 16px',
// //                 borderRadius: 14,
// //                 marginBottom: 22,
// //                 background: 'rgba(255,79,23,0.06)',
// //                 border: '1.5px solid rgba(255,79,23,0.18)',
// //                 color: '#C0370A',
// //                 fontSize: '0.83rem',
// //                 fontWeight: 600,
// //                 display: 'flex',
// //                 alignItems: 'flex-start',
// //                 gap: 9,
// //                 animation: 'mxFadeUp 0.3s ease both',
// //               }}>
// //                 <span style={{ flexShrink: 0, marginTop: 1 }}>⚠</span>
// //                 <span>{error}</span>
// //               </div>
// //             )}

// //             {/* Email field */}
// //             <div style={{ marginBottom: 16 }}>
// //               <label style={{
// //                 display: 'block',
// //                 fontSize: '0.72rem',
// //                 fontWeight: 700,
// //                 color: '#0D1B3E',
// //                 letterSpacing: '0.06em',
// //                 textTransform: 'uppercase',
// //                 marginBottom: 8,
// //               }}>
// //                 Email Address
// //               </label>
// //               <div style={{ position: 'relative' }}>
// //                 <div style={{
// //                   position: 'absolute', left: 15, top: '50%', transform: 'translateY(-50%)',
// //                   color: '#B0BAC8', pointerEvents: 'none',
// //                 }}>
// //                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //                     <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
// //                     <polyline points="22,6 12,13 2,6"/>
// //                   </svg>
// //                 </div>
// //                 <input
// //                   ref={emailRef}
// //                   className="mc-input"
// //                   type="email"
// //                   value={email}
// //                   onChange={e => setEmail(e.target.value)}
// //                   onKeyDown={onKey}
// //                   placeholder="marketcaptura@gmail.com"
// //                   autoComplete="email"
// //                   style={{
// //                     width: '100%',
// //                     padding: '14px 16px 14px 44px',
// //                     border: '1.5px solid #E8EEF8',
// //                     borderRadius: 16,
// //                     fontSize: '0.90rem',
// //                     color: '#0D1B3E',
// //                     background: '#F8FAFF',
// //                     fontWeight: 500,
// //                   }}
// //                 />
// //               </div>
// //             </div>

// //             {/* Password field */}
// //             <div style={{ marginBottom: 28 }}>
// //               <label style={{
// //                 display: 'block',
// //                 fontSize: '0.72rem',
// //                 fontWeight: 700,
// //                 color: '#0D1B3E',
// //                 letterSpacing: '0.06em',
// //                 textTransform: 'uppercase',
// //                 marginBottom: 8,
// //               }}>
// //                 Password
// //               </label>
// //               <div style={{ position: 'relative' }}>
// //                 <div style={{
// //                   position: 'absolute', left: 15, top: '50%', transform: 'translateY(-50%)',
// //                   color: '#B0BAC8', pointerEvents: 'none',
// //                 }}>
// //                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //                     <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
// //                     <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
// //                   </svg>
// //                 </div>
// //                 <input
// //                   className="mc-input"
// //                   type={showPw ? 'text' : 'password'}
// //                   value={password}
// //                   onChange={e => setPassword(e.target.value)}
// //                   onKeyDown={onKey}
// //                   placeholder="Enter your password"
// //                   autoComplete="current-password"
// //                   style={{
// //                     width: '100%',
// //                     padding: '14px 48px 14px 44px',
// //                     border: '1.5px solid #E8EEF8',
// //                     borderRadius: 16,
// //                     fontSize: '0.90rem',
// //                     color: '#0D1B3E',
// //                     background: '#F8FAFF',
// //                     fontWeight: 500,
// //                   }}
// //                 />
// //                 <button
// //                   type="button"
// //                   className="mc-eye"
// //                   onClick={() => setShowPw(v => !v)}
// //                   style={{
// //                     position: 'absolute', right: 14, top: '50%',
// //                     transform: 'translateY(-50%)',
// //                     background: 'none', border: 'none', cursor: 'pointer',
// //                     color: '#B0BAC8',
// //                     display: 'flex', alignItems: 'center',
// //                     padding: 3,
// //                   }}
// //                 >
// //                   <EyeIcon open={showPw} />
// //                 </button>
// //               </div>
// //             </div>

// //             {/* Submit button */}
// //             <button
// //               className="mc-btn"
// //               onClick={handleLogin}
// //               disabled={loading}
// //               style={{
// //                 width: '100%',
// //                 background: loading
// //                   ? '#C8D3F5'
// //                   : 'linear-gradient(135deg, #2352FF 0%, #1a3fd4 100%)',
// //                 color: '#fff',
// //                 border: 'none',
// //                 borderRadius: 60,
// //                 padding: '16px 28px',
// //                 fontSize: '0.97rem',
// //                 fontWeight: 700,
// //                 cursor: loading ? 'not-allowed' : 'pointer',
// //                 letterSpacing: '-0.01em',
// //                 boxShadow: loading ? 'none' : '0 6px 20px rgba(35,82,255,0.28)',
// //                 display: 'flex',
// //                 alignItems: 'center',
// //                 justifyContent: 'center',
// //                 gap: 10,
// //                 position: 'relative',
// //                 overflow: 'hidden',
// //               }}
// //             >
// //               {/* Shimmer overlay */}
// //               {!loading && (
// //                 <div style={{
// //                   position: 'absolute', inset: 0,
// //                   background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.12) 50%, transparent 100%)',
// //                   backgroundSize: '200% 100%',
// //                   animation: 'shimmer 2.5s infinite',
// //                   borderRadius: 60,
// //                 }} />
// //               )}
// //               {loading ? (
// //                 <>
// //                   <div style={{
// //                     width: 18, height: 18, borderRadius: '50%',
// //                     border: '2.5px solid rgba(255,255,255,0.3)',
// //                     borderTop: '2.5px solid #fff',
// //                     animation: 'spin 0.75s linear infinite',
// //                   }} />
// //                   Signing in…
// //                 </>
// //               ) : (
// //                 <span style={{ position: 'relative' }}>Sign In to Dashboard →</span>
// //               )}
// //             </button>

// //             {/* Security note */}
// //             <div style={{
// //               display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
// //               marginTop: 18,
// //             }}>
// //               <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#B0BAC8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
// //                 <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
// //                 <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
// //               </svg>
// //               <p style={{ textAlign: 'center', color: '#B0BAC8', fontSize: '0.74rem', fontWeight: 600, letterSpacing: '0.02em' }}>
// //                 Restricted access · MarketCaptura internal only
// //               </p>
// //             </div>

// //             {/* Divider */}
// //             <div style={{
// //               display: 'flex', alignItems: 'center', gap: 14,
// //               margin: '28px 0 24px',
// //             }}>
// //               <div style={{ flex: 1, height: 1, background: '#EEF2FB' }} />
// //               <span style={{ fontSize: '0.70rem', color: '#C4CDD9', fontWeight: 600, letterSpacing: '0.05em' }}>TRUSTED BY</span>
// //               <div style={{ flex: 1, height: 1, background: '#EEF2FB' }} />
// //             </div>

// //             {/* Trust strip */}
// //             <div style={{
// //               display: 'flex',
// //               alignItems: 'center',
// //               justifyContent: 'center',
// //               gap: 18,
// //               flexWrap: 'wrap',
// //             }}>
// //               <div style={{
// //                 display: 'flex', alignItems: 'center', gap: 7,
// //                 background: '#F8FAFF', border: '1.5px solid #E8EEF8',
// //                 borderRadius: 40, padding: '7px 14px',
// //               }}>
// //                 <span style={{ fontSize: 14 }}>⭐</span>
// //                 <span style={{ fontSize: '0.76rem', color: '#0D1B3E', fontWeight: 700 }}>4.8★ · 150+ Projects</span>
// //               </div>
// //               <div style={{
// //                 display: 'flex', alignItems: 'center', gap: 7,
// //                 background: '#F8FAFF', border: '1.5px solid #E8EEF8',
// //                 borderRadius: 40, padding: '7px 14px',
// //               }}>
// //                 <span style={{ fontSize: '0.95rem' }}>🇮🇳</span>
// //                 <span style={{ fontSize: '0.76rem', color: '#0D1B3E', fontWeight: 700 }}>India Registered</span>
// //               </div>
// //             </div>

// //           </div>
// //         </div>
// //       </div>
// //     </>
// //   );
// // }


// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import { useRouter } from 'next/navigation';
// import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
// import { auth } from '@/lib/firebase';

// const ALLOWED_EMAIL = 'marketcaptura@gmail.com';

// function EyeIcon({ open }: { open: boolean }) {
//   return open ? (
//     <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//       <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
//     </svg>
//   ) : (
//     <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//       <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
//       <line x1="1" y1="1" x2="23" y2="23" />
//     </svg>
//   );
// }

// const STATS = [
//   { val: '150+', label: 'Brands Served' },
//   { val: '3.8×', label: 'Avg ROI' },
//   { val: '98%',  label: 'Client Retention' },
// ];

// export default function LoginPage() {
//   const router   = useRouter();
//   const [email,    setEmail]    = useState('');
//   const [password, setPassword] = useState('');
//   const [showPw,   setShowPw]   = useState(false);
//   const [loading,  setLoading]  = useState(false);
//   const [error,    setError]    = useState('');
//   const [checking, setChecking] = useState(true);
//   const [mounted,  setMounted]  = useState(false);
//   const emailRef = useRef<HTMLInputElement>(null);

//   useEffect(() => {
//     setMounted(true);
//     const unsub = onAuthStateChanged(auth, user => {
//       if (user && user.email === ALLOWED_EMAIL) {
//         router.replace('/admin');
//       } else {
//         setChecking(false);
//         setTimeout(() => emailRef.current?.focus(), 300);
//       }
//     });
//     return unsub;
//   }, [router]);

//   const handleLogin = async () => {
//     setError('');
//     if (!email.trim()) { setError('Please enter your email address.'); return; }
//     if (!password)     { setError('Please enter your password.'); return; }
//     if (email.trim().toLowerCase() !== ALLOWED_EMAIL) {
//       setError('Access denied. This portal is restricted to authorized users only.');
//       return;
//     }
//     setLoading(true);
//     try {
//       await signInWithEmailAndPassword(auth, email.trim(), password);
//       router.replace('/admin');
//     } catch (e: unknown) {
//       const code = (e as { code?: string })?.code ?? '';
//       if (['auth/wrong-password', 'auth/invalid-credential'].includes(code)) {
//         setError('Incorrect password. Please try again.');
//       } else if (code === 'auth/user-not-found') {
//         setError('No account found with this email.');
//       } else if (code === 'auth/too-many-requests') {
//         setError('Too many failed attempts. Please wait and try again.');
//       } else {
//         setError('Login failed. Please check your credentials and try again.');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const onKey = (e: React.KeyboardEvent) => { if (e.key === 'Enter') handleLogin(); };

//   if (checking) {
//     return (
//       <>
//         <style>{`
//           @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap');
//           @keyframes spin { to { transform: rotate(360deg); } }
//         `}</style>
//         <div style={{
//           minHeight: '100vh',
//           background: 'linear-gradient(160deg, #EEF3FC 0%, #F5F8FF 50%, #EBF0FA 100%)',
//           display: 'flex', alignItems: 'center', justifyContent: 'center',
//           fontFamily: "'Syne', sans-serif",
//         }}>
//           <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
//             <div style={{
//               width: 40, height: 40, borderRadius: '50%',
//               border: '3px solid rgba(35,82,255,0.15)',
//               borderTop: '3px solid #2352FF',
//               animation: 'spin 0.8s linear infinite',
//             }} />
//             <span style={{ fontSize: '0.78rem', color: '#9AA5B4', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: "'Syne', sans-serif" }}>
//               Verifying session…
//             </span>
//           </div>
//         </div>
//       </>
//     );
//   }

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap');

//         *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

//         /* Nuclear font override — force Syne on every element like the hero page */
//         .login-root,
//         .login-root *,
//         .login-root input,
//         .login-root button,
//         .login-root label,
//         .login-root p,
//         .login-root h1,
//         .login-root h2,
//         .login-root span {
//           font-family: 'Syne', sans-serif !important;
//         }

//         @keyframes mxFadeUp {
//           from { opacity: 0; transform: translateY(28px); }
//           to   { opacity: 1; transform: translateY(0);    }
//         }
//         @keyframes mxFadeRight {
//           from { opacity: 0; transform: translateX(-32px); }
//           to   { opacity: 1; transform: translateX(0);     }
//         }
//         @keyframes mxFadeLeft {
//           from { opacity: 0; transform: translateX(32px); }
//           to   { opacity: 1; transform: translateX(0);    }
//         }
//         @keyframes mxFloat {
//           0%, 100% { transform: translateY(0);    }
//           50%       { transform: translateY(-9px); }
//         }
//         @keyframes spin { to { transform: rotate(360deg); } }
//         @keyframes shimmer {
//           0%   { background-position: -200% center; }
//           100% { background-position:  200% center; }
//         }
//         @keyframes pulseRing {
//           0%   { transform: scale(1);   opacity: 0.5; }
//           100% { transform: scale(1.6); opacity: 0;   }
//         }
//         @keyframes fadeErr {
//           from { opacity: 0; transform: translateY(-6px); }
//           to   { opacity: 1; transform: translateY(0);    }
//         }

//         .mc-input {
//           transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
//           outline: none;
//         }
//         .mc-input:focus {
//           border-color: #2352FF !important;
//           box-shadow: 0 0 0 4px rgba(35,82,255,0.10) !important;
//           background: #ffffff !important;
//         }
//         .mc-input::placeholder { color: #C4CDD9; }

//         .mc-btn { transition: transform 0.22s, box-shadow 0.22s; }
//         .mc-btn:hover:not(:disabled) {
//           transform: translateY(-2px);
//           box-shadow: 0 14px 36px rgba(35,82,255,0.35) !important;
//         }
//         .mc-btn:active:not(:disabled) { transform: scale(0.98); }

//         .mc-eye { transition: color 0.18s; }
//         .mc-eye:hover { color: #2352FF !important; }

//         .stat-card { transition: transform 0.22s, box-shadow 0.22s; }
//         .stat-card:hover {
//           transform: translateY(-4px);
//           box-shadow: 0 14px 36px rgba(35,82,255,0.13) !important;
//         }

//         .login-wrap { display: flex; min-height: 100vh; }

//         @media (max-width: 900px) {
//           .login-left-panel { display: none !important; }
//           .login-right-panel {
//             width: 100% !important;
//             border-radius: 0 !important;
//             padding: 40px 24px !important;
//           }
//         }
//       `}</style>

//       {/* Background — identical to hero */}
//       <div style={{
//         position: 'fixed', inset: 0, zIndex: -1,
//         background: 'linear-gradient(160deg, #EEF3FC 0%, #F5F8FF 50%, #EBF0FA 100%)',
//       }} />
//       <div style={{
//         position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
//         backgroundImage: `
//           linear-gradient(rgba(35,82,255,0.04) 1px, transparent 1px),
//           linear-gradient(90deg, rgba(35,82,255,0.04) 1px, transparent 1px)
//         `,
//         backgroundSize: '60px 60px',
//       }} />

//       <div className="login-root login-wrap" style={{ position: 'relative' }}>

//         {/* ══════════ LEFT PANEL ══════════ */}
//         <div
//           className="login-left-panel"
//           style={{
//             flex: '1 1 55%',
//             display: 'flex',
//             flexDirection: 'column',
//             justifyContent: 'center',
//             padding: '60px 56px 60px 64px',
//             position: 'relative',
//             zIndex: 1,
//             animation: mounted ? 'mxFadeRight 0.7s 0.1s ease both' : 'none',
//           }}
//         >
//           {/* Blobs */}
//           <div style={{
//             position: 'absolute', width: 480, height: 480, borderRadius: '50%',
//             background: 'radial-gradient(circle, rgba(35,82,255,0.09) 0%, transparent 70%)',
//             top: -120, left: -120, pointerEvents: 'none',
//           }} />
//           <div style={{
//             position: 'absolute', width: 360, height: 360, borderRadius: '50%',
//             background: 'radial-gradient(circle, rgba(255,79,23,0.07) 0%, transparent 70%)',
//             bottom: -80, right: '10%', pointerEvents: 'none',
//           }} />

//           {/* Logo */}
//           <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 44 }}>
//             <div style={{
//               width: 48, height: 48, borderRadius: 15,
//               background: 'linear-gradient(135deg, #2352FF, #1a3fd4)',
//               display: 'flex', alignItems: 'center', justifyContent: 'center',
//               boxShadow: '0 8px 24px rgba(35,82,255,0.30)',
//               fontSize: 22, fontWeight: 800, color: '#fff',
//               position: 'relative',
//             }}>
//               M
//               <div style={{
//                 position: 'absolute', inset: -3, borderRadius: 18,
//                 border: '2px solid rgba(35,82,255,0.35)',
//                 animation: 'pulseRing 2s ease-out infinite',
//               }} />
//             </div>
//             <span style={{ fontSize: '1.3rem', fontWeight: 800, letterSpacing: '-0.03em', color: '#0D1B3E' }}>
//               Market<span style={{ color: '#FF4F17' }}>Captura</span>
//             </span>
//           </div>

//           {/* Badge */}
//           <div style={{
//             display: 'inline-flex', alignItems: 'center', gap: 8,
//             background: '#fff', border: '1.5px solid #E4ECF7',
//             borderRadius: 60, padding: '7px 18px 7px 12px',
//             marginBottom: 28, boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
//             width: 'fit-content',
//           }}>
//             <span style={{ fontSize: 14 }}>⭐</span>
//             <span style={{ fontSize: '0.76rem', fontWeight: 700, color: '#0D1B3E', letterSpacing: '0.07em', textTransform: 'uppercase' }}>
//               India&apos;s Next-Gen Marketing Agency
//             </span>
//           </div>

//           {/* Headline — matches hero h1: clamp(2.3rem,4.5vw,3.7rem) weight 800 */}
//           <h1 style={{
//             fontSize: 'clamp(2.3rem, 3.8vw, 3.4rem)',
//             fontWeight: 800,
//             lineHeight: 1.08,
//             color: '#0D1B3E',
//             letterSpacing: '-0.025em',
//             marginBottom: 20,
//           }}>
//             Your Command<br />
//             Centre for{' '}
//             <span style={{ color: '#2352FF', display: 'inline-block', position: 'relative' }}>
//               Brand Growth
//               <svg viewBox="0 0 220 12" xmlns="http://www.w3.org/2000/svg"
//                 style={{ position: 'absolute', bottom: -5, left: 0, width: '100%', height: 8, opacity: 0.45 }}>
//                 <path d="M2 8 Q55 2 110 8 Q165 14 218 8" stroke="#2352FF" strokeWidth="3" fill="none" strokeLinecap="round" />
//               </svg>
//             </span>
//           </h1>

//           <p style={{ fontSize: '1rem', color: '#6B7280', lineHeight: 1.8, marginBottom: 40, maxWidth: 480, fontWeight: 500 }}>
//             Access leads, track campaigns, and monitor performance — all from one{' '}
//             <strong style={{ color: '#0D1B3E', fontWeight: 700 }}>powerful dashboard</strong>.
//           </p>

//           {/* Stat cards */}
//           <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 40 }}>
//             {STATS.map((s, i) => (
//               <div key={s.label} className="stat-card" style={{
//                 background: '#fff', border: '1.5px solid #E4ECF7',
//                 borderRadius: 18, padding: '18px 22px',
//                 boxShadow: '0 4px 16px rgba(35,82,255,0.07)', minWidth: 110,
//                 animation: mounted ? `mxFadeUp 0.6s ${0.35 + i * 0.1}s ease both` : 'none',
//               }}>
//                 <div style={{ fontSize: 'clamp(1.5rem, 2.2vw, 1.9rem)', fontWeight: 800, color: '#0D1B3E', letterSpacing: '-0.025em', lineHeight: 1 }}>
//                   {s.val}
//                 </div>
//                 <div style={{ fontSize: '0.72rem', color: '#9AA5B4', marginTop: 6, fontWeight: 600, letterSpacing: '0.03em' }}>
//                   {s.label}
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Floating badges */}
//           <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
//             <div style={{
//               background: '#fff', border: '1.5px solid #E4ECF7', borderRadius: 16,
//               padding: '12px 18px', display: 'flex', alignItems: 'center', gap: 12,
//               boxShadow: '0 6px 24px rgba(35,82,255,0.09)',
//               animation: 'mxFloat 4s ease-in-out infinite',
//             }}>
//               <div style={{ width: 38, height: 38, borderRadius: 12, background: 'linear-gradient(135deg,#2352FF,#1a3fd4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17 }}>📈</div>
//               <div>
//                 <div style={{ fontSize: '0.62rem', color: '#9AA5B4', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em' }}>Avg ROI</div>
//                 <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0D1B3E', letterSpacing: '-0.02em' }}>3.8×</div>
//               </div>
//             </div>
//             <div style={{
//               background: '#fff', border: '1.5px solid #E4ECF7', borderRadius: 16,
//               padding: '12px 18px', display: 'flex', alignItems: 'center', gap: 12,
//               boxShadow: '0 6px 24px rgba(35,82,255,0.07)',
//               animation: 'mxFloat 4.5s ease-in-out infinite 1.2s',
//             }}>
//               <div style={{ display: 'flex' }}>
//                 {['#2352FF','#FF4F17','#22C55E'].map((c,i) => (
//                   <div key={i} style={{ width: 24, height: 24, borderRadius: '50%', background: c, border: '2px solid #fff', marginLeft: i > 0 ? -9 : 0 }} />
//                 ))}
//               </div>
//               <div>
//                 <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0D1B3E' }}>150+ Brands</div>
//                 <div style={{ fontSize: '0.65rem', color: '#9AA5B4', marginTop: 2 }}>Trust MarketCaptura</div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* ══════════ RIGHT PANEL ══════════ */}
//         <div
//           className="login-right-panel"
//           style={{
//             width: 'min(500px, 100%)',
//             background: '#fff',
//             borderRadius: '36px 0 0 36px',
//             boxShadow: '-24px 0 80px rgba(35,82,255,0.08), -1px 0 0 #E8EEF8',
//             display: 'flex', alignItems: 'center', justifyContent: 'center',
//             padding: '56px 44px',
//             position: 'relative', zIndex: 2, minHeight: '100vh',
//             animation: mounted ? 'mxFadeLeft 0.7s 0.15s ease both' : 'none',
//           }}
//         >
//           <div style={{
//             position: 'absolute', top: 0, left: 0, right: 0, height: 200,
//             borderRadius: '36px 0 0 0',
//             background: 'linear-gradient(180deg, rgba(235,240,255,0.55) 0%, rgba(255,255,255,0) 100%)',
//             pointerEvents: 'none',
//           }} />

//           <div style={{ width: '100%', maxWidth: 390, position: 'relative' }}>

//             {/* Accent bar */}
//             <div style={{ width: 52, height: 4, borderRadius: 60, background: 'linear-gradient(90deg,#2352FF,#FF4F17)', marginBottom: 30 }} />

//             {/* Admin pill */}
//             <div style={{
//               display: 'inline-flex', alignItems: 'center', gap: 8,
//               background: 'rgba(35,82,255,0.07)', border: '1.5px solid rgba(35,82,255,0.16)',
//               borderRadius: 60, padding: '5px 14px 5px 10px', marginBottom: 20,
//             }}>
//               <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#2352FF', display: 'inline-block', boxShadow: '0 0 0 3px rgba(35,82,255,0.2)' }} />
//               <span style={{ fontSize: '0.69rem', fontWeight: 700, color: '#2352FF', letterSpacing: '0.09em', textTransform: 'uppercase' }}>
//                 Admin Portal
//               </span>
//             </div>

//             {/* Headline — same weight/tracking/size family as hero h1 */}
//             <h2 style={{
//               fontSize: 'clamp(2rem, 2.8vw, 2.5rem)',
//               fontWeight: 800,
//               letterSpacing: '-0.03em',
//               color: '#0D1B3E',
//               lineHeight: 1.08,
//               marginBottom: 10,
//             }}>
//               Welcome back 👋
//             </h2>
//             <p style={{ color: '#8A94A6', fontSize: '0.92rem', lineHeight: 1.75, marginBottom: 32, fontWeight: 500 }}>
//               Sign in to your MarketCaptura admin dashboard.
//             </p>

//             {/* Error */}
//             {error && (
//               <div style={{
//                 padding: '12px 16px', borderRadius: 14, marginBottom: 22,
//                 background: 'rgba(255,79,23,0.06)', border: '1.5px solid rgba(255,79,23,0.18)',
//                 color: '#C0370A', fontSize: '0.83rem', fontWeight: 700,
//                 display: 'flex', alignItems: 'flex-start', gap: 9,
//                 animation: 'fadeErr 0.3s ease both',
//               }}>
//                 <span style={{ flexShrink: 0, marginTop: 1 }}>⚠</span>
//                 <span>{error}</span>
//               </div>
//             )}

//             {/* Email */}
//             <div style={{ marginBottom: 16 }}>
//               <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: '#0D1B3E', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8 }}>
//                 Email Address
//               </label>
//               <div style={{ position: 'relative' }}>
//                 <div style={{ position: 'absolute', left: 15, top: '50%', transform: 'translateY(-50%)', color: '#B0BAC8', pointerEvents: 'none' }}>
//                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                     <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
//                     <polyline points="22,6 12,13 2,6"/>
//                   </svg>
//                 </div>
//                 <input
//                   ref={emailRef}
//                   className="mc-input"
//                   type="email"
//                   value={email}
//                   onChange={e => setEmail(e.target.value)}
//                   onKeyDown={onKey}
//                   placeholder="marketcaptura@gmail.com"
//                   autoComplete="email"
//                   style={{
//                     width: '100%', padding: '14px 16px 14px 44px',
//                     border: '1.5px solid #E8EEF8', borderRadius: 16,
//                     fontSize: '0.91rem', color: '#0D1B3E',
//                     background: '#F8FAFF', fontWeight: 500,
//                   }}
//                 />
//               </div>
//             </div>

//             {/* Password */}
//             <div style={{ marginBottom: 28 }}>
//               <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: '#0D1B3E', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8 }}>
//                 Password
//               </label>
//               <div style={{ position: 'relative' }}>
//                 <div style={{ position: 'absolute', left: 15, top: '50%', transform: 'translateY(-50%)', color: '#B0BAC8', pointerEvents: 'none' }}>
//                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                     <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
//                     <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
//                   </svg>
//                 </div>
//                 <input
//                   className="mc-input"
//                   type={showPw ? 'text' : 'password'}
//                   value={password}
//                   onChange={e => setPassword(e.target.value)}
//                   onKeyDown={onKey}
//                   placeholder="Enter your password"
//                   autoComplete="current-password"
//                   style={{
//                     width: '100%', padding: '14px 48px 14px 44px',
//                     border: '1.5px solid #E8EEF8', borderRadius: 16,
//                     fontSize: '0.91rem', color: '#0D1B3E',
//                     background: '#F8FAFF', fontWeight: 500,
//                   }}
//                 />
//                 <button type="button" className="mc-eye" onClick={() => setShowPw(v => !v)} style={{
//                   position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
//                   background: 'none', border: 'none', cursor: 'pointer', color: '#B0BAC8',
//                   display: 'flex', alignItems: 'center', padding: 3,
//                 }}>
//                   <EyeIcon open={showPw} />
//                 </button>
//               </div>
//             </div>

//             {/* CTA button */}
//             <button
//               className="mc-btn"
//               onClick={handleLogin}
//               disabled={loading}
//               style={{
//                 width: '100%',
//                 background: loading ? '#C8D3F5' : 'linear-gradient(135deg,#2352FF 0%,#1a3fd4 100%)',
//                 color: '#fff', border: 'none', borderRadius: 60,
//                 padding: '16px 28px', fontSize: '0.97rem', fontWeight: 800,
//                 cursor: loading ? 'not-allowed' : 'pointer', letterSpacing: '-0.015em',
//                 boxShadow: loading ? 'none' : '0 6px 20px rgba(35,82,255,0.28)',
//                 display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
//                 position: 'relative', overflow: 'hidden',
//               }}
//             >
//               {!loading && (
//                 <div style={{
//                   position: 'absolute', inset: 0,
//                   background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.12) 50%, transparent 100%)',
//                   backgroundSize: '200% 100%', animation: 'shimmer 2.5s infinite', borderRadius: 60,
//                 }} />
//               )}
//               {loading ? (
//                 <>
//                   <div style={{ width: 18, height: 18, borderRadius: '50%', border: '2.5px solid rgba(255,255,255,0.3)', borderTop: '2.5px solid #fff', animation: 'spin 0.75s linear infinite' }} />
//                   <span>Signing in…</span>
//                 </>
//               ) : (
//                 <span style={{ position: 'relative' }}>Sign In to Dashboard →</span>
//               )}
//             </button>

//             {/* Security note */}
//             <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, marginTop: 18 }}>
//               <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#C4CDD9" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//                 <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
//                 <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
//               </svg>
//               <p style={{ color: '#C4CDD9', fontSize: '0.73rem', fontWeight: 600, letterSpacing: '0.02em' }}>
//                 Restricted access · MarketCaptura internal only
//               </p>
//             </div>

//             {/* Divider */}
//             <div style={{ display: 'flex', alignItems: 'center', gap: 14, margin: '28px 0 22px' }}>
//               <div style={{ flex: 1, height: 1, background: '#EEF2FB' }} />
//               <span style={{ fontSize: '0.68rem', color: '#C4CDD9', fontWeight: 700, letterSpacing: '0.08em' }}>TRUSTED BY</span>
//               <div style={{ flex: 1, height: 1, background: '#EEF2FB' }} />
//             </div>

//             {/* Trust pills */}
//             <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, flexWrap: 'wrap' }}>
//               {[
//                 { icon: '⭐', text: '4.8★ · 150+ Projects' },
//                 { icon: '🇮🇳', text: 'India Registered' },
//               ].map(item => (
//                 <div key={item.text} style={{
//                   display: 'flex', alignItems: 'center', gap: 7,
//                   background: '#F8FAFF', border: '1.5px solid #E8EEF8',
//                   borderRadius: 40, padding: '7px 14px',
//                 }}>
//                   <span style={{ fontSize: '0.95rem' }}>{item.icon}</span>
//                   <span style={{ fontSize: '0.76rem', color: '#0D1B3E', fontWeight: 700 }}>{item.text}</span>
//                 </div>
//               ))}
//             </div>

//           </div>
//         </div>
//       </div>
//     </>
//   );
// }


'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';

const ALLOWED_EMAIL = 'marketcaptura@gmail.com';

function EyeIcon({ open }: { open: boolean }) {
  return open ? (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

const STATS = [
  { val: '150+', label: 'Brands Served' },
  { val: '3.8×', label: 'Avg ROI' },
  { val: '98%',  label: 'Client Retention' },
];

// ─── Syne is already loaded in globals.css, no need to re-import ───

export default function LoginPage() {
  const router   = useRouter();
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [showPw,   setShowPw]   = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState('');
  const [checking, setChecking] = useState(true);
  const [mounted,  setMounted]  = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
    const unsub = onAuthStateChanged(auth, user => {
      if (user && user.email === ALLOWED_EMAIL) {
        router.replace('/admin');
      } else {
        setChecking(false);
        setTimeout(() => emailRef.current?.focus(), 300);
      }
    });
    return unsub;
  }, [router]);

  const handleLogin = async () => {
    setError('');
    if (!email.trim()) { setError('Please enter your email address.'); return; }
    if (!password)     { setError('Please enter your password.'); return; }
    if (email.trim().toLowerCase() !== ALLOWED_EMAIL) {
      setError('Access denied. This portal is restricted to authorized users only.');
      return;
    }
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      router.replace('/admin');
    } catch (e: unknown) {
      const code = (e as { code?: string })?.code ?? '';
      if (['auth/wrong-password', 'auth/invalid-credential'].includes(code)) {
        setError('Incorrect password. Please try again.');
      } else if (code === 'auth/user-not-found') {
        setError('No account found with this email.');
      } else if (code === 'auth/too-many-requests') {
        setError('Too many failed attempts. Please wait and try again.');
      } else {
        setError('Login failed. Please check your credentials and try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const onKey = (e: React.KeyboardEvent) => { if (e.key === 'Enter') handleLogin(); };

  // ── THE FIX: globals.css sets body { font-family: 'DM Sans' }
  // We need a high-specificity CSS rule that overrides it for the entire login page.
  // Using [data-login-page] attribute selector which beats the bare `body` rule.
  const overrideStyles = `
    /* Override globals.css body { font-family: 'DM Sans' } */
    [data-login-page],
    [data-login-page] * {
      font-family: 'Syne', sans-serif !important;
    }

    [data-login-page] *,
    [data-login-page] *::before,
    [data-login-page] *::after {
      box-sizing: border-box;
    }

    /* Reset globals.css margin/padding already done, just ensure inputs/buttons inherit */
    [data-login-page] input,
    [data-login-page] button,
    [data-login-page] label,
    [data-login-page] a {
      font-family: 'Syne', sans-serif !important;
    }

    @keyframes lp-fadeUp {
      from { opacity: 0; transform: translateY(28px); }
      to   { opacity: 1; transform: translateY(0);    }
    }
    @keyframes lp-fadeRight {
      from { opacity: 0; transform: translateX(-32px); }
      to   { opacity: 1; transform: translateX(0);     }
    }
    @keyframes lp-fadeLeft {
      from { opacity: 0; transform: translateX(32px); }
      to   { opacity: 1; transform: translateX(0);    }
    }
    @keyframes lp-float {
      0%, 100% { transform: translateY(0);    }
      50%       { transform: translateY(-9px); }
    }
    @keyframes lp-spin { to { transform: rotate(360deg); } }
    @keyframes lp-shimmer {
      0%   { background-position: -200% center; }
      100% { background-position:  200% center; }
    }
    @keyframes lp-pulseRing {
      0%   { transform: scale(1);   opacity: 0.5; }
      100% { transform: scale(1.6); opacity: 0;   }
    }
    @keyframes lp-fadeErr {
      from { opacity: 0; transform: translateY(-6px); }
      to   { opacity: 1; transform: translateY(0);    }
    }

    [data-login-page] .lp-input {
      transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
      outline: none;
    }
    [data-login-page] .lp-input:focus {
      border-color: #2352FF !important;
      box-shadow: 0 0 0 4px rgba(35,82,255,0.10) !important;
      background: #ffffff !important;
    }
    [data-login-page] .lp-input::placeholder {
      color: #C4CDD9;
      font-family: 'Syne', sans-serif !important;
    }

    [data-login-page] .lp-btn {
      transition: transform 0.22s, box-shadow 0.22s;
    }
    [data-login-page] .lp-btn:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 14px 36px rgba(35,82,255,0.35) !important;
    }
    [data-login-page] .lp-btn:active:not(:disabled) { transform: scale(0.98); }

    [data-login-page] .lp-eye:hover { color: #2352FF !important; }

    [data-login-page] .lp-stat:hover {
      transform: translateY(-4px);
      box-shadow: 0 14px 36px rgba(35,82,255,0.13) !important;
    }

    [data-login-page] .lp-wrap {
      display: flex;
      min-height: 100vh;
    }

    @media (max-width: 900px) {
      [data-login-page] .lp-left  { display: none !important; }
      [data-login-page] .lp-right {
        width: 100% !important;
        border-radius: 0 !important;
        padding: 40px 24px !important;
      }
    }
  `;

  if (checking) {
    return (
      <div
        data-login-page
        style={{
          minHeight: '100vh',
          background: 'linear-gradient(160deg, #EEF3FC 0%, #F5F8FF 50%, #EBF0FA 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        <style>{overrideStyles}</style>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <div style={{
            width: 40, height: 40, borderRadius: '50%',
            border: '3px solid rgba(35,82,255,0.15)',
            borderTop: '3px solid #2352FF',
            animation: 'lp-spin 0.8s linear infinite',
          }} />
          <span style={{
            fontSize: '0.78rem', color: '#9AA5B4', fontWeight: 700,
            letterSpacing: '0.08em', textTransform: 'uppercase',
          }}>
            Verifying session…
          </span>
        </div>
      </div>
    );
  }

  return (
    <div data-login-page>
      <style>{overrideStyles}</style>

      {/* Background — identical to hero page */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: -1,
        background: 'linear-gradient(160deg, #EEF3FC 0%, #F5F8FF 50%, #EBF0FA 100%)',
      }} />
      {/* Grid — identical to hero page */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
        backgroundImage: `
          linear-gradient(rgba(35,82,255,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(35,82,255,0.04) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }} />

      <div className="lp-wrap" style={{ position: 'relative' }}>

        {/* ══════════ LEFT PANEL ══════════ */}
        <div
          className="lp-left"
          style={{
            flex: '1 1 55%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '60px 56px 60px 64px',
            position: 'relative',
            zIndex: 1,
            animation: mounted ? 'lp-fadeRight 0.7s 0.1s ease both' : 'none',
          }}
        >
          {/* Ambient blobs */}
          <div style={{
            position: 'absolute', width: 480, height: 480, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(35,82,255,0.09) 0%, transparent 70%)',
            top: -120, left: -120, pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute', width: 360, height: 360, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,79,23,0.07) 0%, transparent 70%)',
            bottom: -80, right: '10%', pointerEvents: 'none',
          }} />

          {/* Logo — same as hero */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 44 }}>
            <div style={{
              width: 48, height: 48, borderRadius: 15,
              background: 'linear-gradient(135deg, #2352FF, #1a3fd4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 8px 24px rgba(35,82,255,0.30)',
              fontSize: 22, fontWeight: 800, color: '#fff',
              position: 'relative',
            }}>
              M
              <div style={{
                position: 'absolute', inset: -3, borderRadius: 18,
                border: '2px solid rgba(35,82,255,0.35)',
                animation: 'lp-pulseRing 2s ease-out infinite',
              }} />
            </div>
            <span style={{ fontSize: '1.3rem', fontWeight: 800, letterSpacing: '-0.03em', color: '#0D1B3E' }}>
              Market<span style={{ color: '#FF4F17' }}>Captura</span>
            </span>
          </div>

          {/* Badge — same as hero */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: '#fff', border: '1.5px solid #E4ECF7',
            borderRadius: 60, padding: '7px 18px 7px 12px',
            marginBottom: 28, boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            width: 'fit-content',
          }}>
            <span style={{ fontSize: 14 }}>⭐</span>
            <span style={{ fontSize: '0.76rem', fontWeight: 700, color: '#0D1B3E', letterSpacing: '0.07em', textTransform: 'uppercase' }}>
              India&apos;s Next-Gen Marketing Agency
            </span>
          </div>

          {/*
            HEADLINE: Exactly matching HeroSection h1 —
            fontSize: clamp(2.3rem, 4.5vw, 3.7rem), fontWeight: 800,
            lineHeight: 1.08, letterSpacing: -0.025em
          */}
          <h1 style={{
            fontSize: 'clamp(2.3rem, 4.5vw, 3.7rem)',
            fontWeight: 800,
            lineHeight: 1.08,
            color: '#0D1B3E',
            letterSpacing: '-0.025em',
            marginBottom: 20,
          }}>
            Your Command<br />
            Centre for{' '}
            <span style={{ color: '#2352FF', display: 'inline-block', position: 'relative' }}>
              Brand Growth
              <svg viewBox="0 0 220 12" xmlns="http://www.w3.org/2000/svg"
                style={{ position: 'absolute', bottom: -5, left: 0, width: '100%', height: 8, opacity: 0.45 }}>
                <path d="M2 8 Q55 2 110 8 Q165 14 218 8" stroke="#2352FF" strokeWidth="3" fill="none" strokeLinecap="round" />
              </svg>
            </span>
          </h1>

          <p style={{ fontSize: '1rem', color: '#6B7280', lineHeight: 1.8, marginBottom: 40, maxWidth: 480, fontWeight: 500 }}>
            Access leads, track campaigns, and monitor performance — all from one{' '}
            <strong style={{ color: '#0D1B3E', fontWeight: 700 }}>powerful dashboard</strong>.
          </p>

          {/* Stat cards */}
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 40 }}>
            {STATS.map((s, i) => (
              <div key={s.label} className="lp-stat" style={{
                background: '#fff', border: '1.5px solid #E4ECF7',
                borderRadius: 18, padding: '18px 22px',
                boxShadow: '0 4px 16px rgba(35,82,255,0.07)', minWidth: 110,
                transition: 'transform 0.22s, box-shadow 0.22s',
                animation: mounted ? `lp-fadeUp 0.6s ${0.35 + i * 0.1}s ease both` : 'none',
              }}>
                <div style={{ fontSize: 'clamp(1.5rem,2.2vw,1.9rem)', fontWeight: 800, color: '#0D1B3E', letterSpacing: '-0.025em', lineHeight: 1 }}>
                  {s.val}
                </div>
                <div style={{ fontSize: '0.72rem', color: '#9AA5B4', marginTop: 6, fontWeight: 600, letterSpacing: '0.03em' }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* Floating badges */}
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <div style={{
              background: '#fff', border: '1.5px solid #E4ECF7', borderRadius: 16,
              padding: '12px 18px', display: 'flex', alignItems: 'center', gap: 12,
              boxShadow: '0 6px 24px rgba(35,82,255,0.09)',
              animation: 'lp-float 4s ease-in-out infinite',
            }}>
              <div style={{ width: 38, height: 38, borderRadius: 12, background: 'linear-gradient(135deg,#2352FF,#1a3fd4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17 }}>📈</div>
              <div>
                <div style={{ fontSize: '0.62rem', color: '#9AA5B4', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em' }}>Avg ROI</div>
                <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0D1B3E', letterSpacing: '-0.02em' }}>3.8×</div>
              </div>
            </div>
            <div style={{
              background: '#fff', border: '1.5px solid #E4ECF7', borderRadius: 16,
              padding: '12px 18px', display: 'flex', alignItems: 'center', gap: 12,
              boxShadow: '0 6px 24px rgba(35,82,255,0.07)',
              animation: 'lp-float 4.5s ease-in-out infinite 1.2s',
            }}>
              <div style={{ display: 'flex' }}>
                {['#2352FF','#FF4F17','#22C55E'].map((c,i) => (
                  <div key={i} style={{ width: 24, height: 24, borderRadius: '50%', background: c, border: '2px solid #fff', marginLeft: i > 0 ? -9 : 0 }} />
                ))}
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0D1B3E' }}>150+ Brands</div>
                <div style={{ fontSize: '0.65rem', color: '#9AA5B4', marginTop: 2 }}>Trust MarketCaptura</div>
              </div>
            </div>
          </div>
        </div>

        {/* ══════════ RIGHT PANEL ══════════ */}
        <div
          className="lp-right"
          style={{
            width: 'min(500px, 100%)',
            background: '#fff',
            borderRadius: '36px 0 0 36px',
            boxShadow: '-24px 0 80px rgba(35,82,255,0.08), -1px 0 0 #E8EEF8',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '56px 44px',
            position: 'relative', zIndex: 2, minHeight: '100vh',
            animation: mounted ? 'lp-fadeLeft 0.7s 0.15s ease both' : 'none',
          }}
        >
          {/* Top gradient tint */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 200,
            borderRadius: '36px 0 0 0',
            background: 'linear-gradient(180deg, rgba(235,240,255,0.55) 0%, rgba(255,255,255,0) 100%)',
            pointerEvents: 'none',
          }} />

          <div style={{ width: '100%', maxWidth: 390, position: 'relative' }}>

            {/* Accent bar */}
            <div style={{ width: 52, height: 4, borderRadius: 60, background: 'linear-gradient(90deg,#2352FF,#FF4F17)', marginBottom: 30 }} />

            {/* Admin pill */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(35,82,255,0.07)', border: '1.5px solid rgba(35,82,255,0.16)',
              borderRadius: 60, padding: '5px 14px 5px 10px', marginBottom: 20,
            }}>
              <span style={{
                width: 7, height: 7, borderRadius: '50%', background: '#2352FF',
                display: 'inline-block', boxShadow: '0 0 0 3px rgba(35,82,255,0.2)',
              }} />
              <span style={{ fontSize: '0.69rem', fontWeight: 700, color: '#2352FF', letterSpacing: '0.09em', textTransform: 'uppercase' }}>
                Admin Portal
              </span>
            </div>

            {/*
              HEADLINE: Same weight/tracking/size as hero.
              globals.css body is DM Sans — the [data-login-page] * rule above overrides it.
            */}
            <h2 style={{
              fontSize: 'clamp(2rem, 2.8vw, 2.5rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              color: '#0D1B3E',
              lineHeight: 1.08,
              marginBottom: 10,
            }}>
              Welcome back 👋
            </h2>
            <p style={{ color: '#8A94A6', fontSize: '0.92rem', lineHeight: 1.75, marginBottom: 32, fontWeight: 500 }}>
              Sign in to your MarketCaptura admin dashboard.
            </p>

            {/* Error banner */}
            {error && (
              <div style={{
                padding: '12px 16px', borderRadius: 14, marginBottom: 22,
                background: 'rgba(255,79,23,0.06)', border: '1.5px solid rgba(255,79,23,0.18)',
                color: '#C0370A', fontSize: '0.83rem', fontWeight: 700,
                display: 'flex', alignItems: 'flex-start', gap: 9,
                animation: 'lp-fadeErr 0.3s ease both',
              }}>
                <span style={{ flexShrink: 0, marginTop: 1 }}>⚠</span>
                <span>{error}</span>
              </div>
            )}

            {/* Email */}
            <div style={{ marginBottom: 16 }}>
              <label style={{
                display: 'block', fontSize: '0.72rem', fontWeight: 700, color: '#0D1B3E',
                letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8,
              }}>
                Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: 15, top: '50%', transform: 'translateY(-50%)', color: '#B0BAC8', pointerEvents: 'none' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <input
                  ref={emailRef}
                  className="lp-input"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onKeyDown={onKey}
                  placeholder="marketcaptura@gmail.com"
                  autoComplete="email"
                  style={{
                    width: '100%', padding: '14px 16px 14px 44px',
                    border: '1.5px solid #E8EEF8', borderRadius: 16,
                    fontSize: '0.91rem', color: '#0D1B3E',
                    background: '#F8FAFF', fontWeight: 500,
                  }}
                />
              </div>
            </div>

            {/* Password */}
            <div style={{ marginBottom: 28 }}>
              <label style={{
                display: 'block', fontSize: '0.72rem', fontWeight: 700, color: '#0D1B3E',
                letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8,
              }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: 15, top: '50%', transform: 'translateY(-50%)', color: '#B0BAC8', pointerEvents: 'none' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </div>
                <input
                  className="lp-input"
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  onKeyDown={onKey}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  style={{
                    width: '100%', padding: '14px 48px 14px 44px',
                    border: '1.5px solid #E8EEF8', borderRadius: 16,
                    fontSize: '0.91rem', color: '#0D1B3E',
                    background: '#F8FAFF', fontWeight: 500,
                  }}
                />
                <button type="button" className="lp-eye" onClick={() => setShowPw(v => !v)} style={{
                  position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer', color: '#B0BAC8',
                  display: 'flex', alignItems: 'center', padding: 3,
                  transition: 'color 0.18s',
                }}>
                  <EyeIcon open={showPw} />
                </button>
              </div>
            </div>

            {/* CTA — same style as hero primary button */}
            <button
              className="lp-btn"
              onClick={handleLogin}
              disabled={loading}
              style={{
                width: '100%',
                background: loading ? '#C8D3F5' : 'linear-gradient(135deg,#2352FF 0%,#1a3fd4 100%)',
                color: '#fff', border: 'none', borderRadius: 60,
                padding: '16px 28px', fontSize: '0.97rem', fontWeight: 800,
                cursor: loading ? 'not-allowed' : 'pointer', letterSpacing: '-0.015em',
                boxShadow: loading ? 'none' : '0 6px 20px rgba(35,82,255,0.28)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                position: 'relative', overflow: 'hidden',
              }}
            >
              {!loading && (
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.12) 50%, transparent 100%)',
                  backgroundSize: '200% 100%', animation: 'lp-shimmer 2.5s infinite', borderRadius: 60,
                }} />
              )}
              {loading ? (
                <>
                  <div style={{ width: 18, height: 18, borderRadius: '50%', border: '2.5px solid rgba(255,255,255,0.3)', borderTop: '2.5px solid #fff', animation: 'lp-spin 0.75s linear infinite' }} />
                  <span>Signing in…</span>
                </>
              ) : (
                <span style={{ position: 'relative' }}>Sign In to Dashboard →</span>
              )}
            </button>

            {/* Security note */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, marginTop: 18 }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#C4CDD9" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              <p style={{ color: '#C4CDD9', fontSize: '0.73rem', fontWeight: 600, letterSpacing: '0.02em' }}>
                Restricted access · MarketCaptura internal only
              </p>
            </div>

            {/* Divider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, margin: '28px 0 22px' }}>
              <div style={{ flex: 1, height: 1, background: '#EEF2FB' }} />
              <span style={{ fontSize: '0.68rem', color: '#C4CDD9', fontWeight: 700, letterSpacing: '0.08em' }}>TRUSTED BY</span>
              <div style={{ flex: 1, height: 1, background: '#EEF2FB' }} />
            </div>

            {/* Trust pills */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, flexWrap: 'wrap' }}>
              {[
                { icon: '⭐', text: '4.8★ · 150+ Projects' },
               
              ].map(item => (
                <div key={item.text} style={{
                  display: 'flex', alignItems: 'center', gap: 7,
                  background: '#F8FAFF', border: '1.5px solid #E8EEF8',
                  borderRadius: 40, padding: '7px 14px',
                }}>
                  <span style={{ fontSize: '0.95rem' }}>{item.icon}</span>
                  <span style={{ fontSize: '0.76rem', color: '#0D1B3E', fontWeight: 700 }}>{item.text}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}