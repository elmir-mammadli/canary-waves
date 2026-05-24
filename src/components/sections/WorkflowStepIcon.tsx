interface WorkflowStepIconProps {
  step: string;
}

const ICON_HTML: Record<string, string> = {
  '01': `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- Radio body -->
          <rect x="20" y="28" width="40" height="36" rx="5" fill="#9C5230" stroke="#1F1716" stroke-width="2.5"/>
          <!-- Antenna -->
          <line x1="50" y1="28" x2="58" y2="10" stroke="#1F1716" stroke-width="2.5" stroke-linecap="round"/>
          <circle cx="59" cy="9" r="3" fill="#FFBE56" stroke="#1F1716" stroke-width="2"/>
          <!-- Speaker grille lines -->
          <line x1="27" y1="38" x2="45" y2="38" stroke="#F4E8DA" stroke-width="2" stroke-linecap="round" opacity="0.7"/>
          <line x1="27" y1="43" x2="45" y2="43" stroke="#F4E8DA" stroke-width="2" stroke-linecap="round" opacity="0.7"/>
          <line x1="27" y1="48" x2="40" y2="48" stroke="#F4E8DA" stroke-width="2" stroke-linecap="round" opacity="0.7"/>
          <!-- PTT button -->
          <rect x="48" y="38" width="8" height="14" rx="2" fill="#FFBE56" stroke="#1F1716" stroke-width="2"/>
          <!-- Signal waves -->
          <path d="M8 35 Q4 40 8 45" stroke="#FFBE56" stroke-width="2.5" stroke-linecap="round" fill="none"/>
          <path d="M14 30 Q7 40 14 50" stroke="#FFBE56" stroke-width="2.5" stroke-linecap="round" fill="none" opacity="0.7"/>
          <!-- Bottom stand -->
          <rect x="28" y="62" width="24" height="4" rx="2" fill="#1F1716"/>
        </svg>`,
  '02': `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- Speech bubble -->
          <rect x="8" y="10" width="42" height="30" rx="6" fill="#4E7B7C" stroke="#1F1716" stroke-width="2.5"/>
          <!-- Bubble tail -->
          <path d="M18 40 L12 52 L28 40Z" fill="#4E7B7C" stroke="#1F1716" stroke-width="2" stroke-linejoin="round"/>
          <!-- Sound waves inside bubble -->
          <path d="M18 21 Q20 25 18 29" stroke="#F4E8DA" stroke-width="2.5" stroke-linecap="round" fill="none"/>
          <path d="M24 18 Q28 25 24 32" stroke="#F4E8DA" stroke-width="2.5" stroke-linecap="round" fill="none"/>
          <path d="M30 16 Q36 25 30 34" stroke="#FFBE56" stroke-width="2.5" stroke-linecap="round" fill="none"/>
          <!-- Arrow -->
          <path d="M54 28 L62 28" stroke="#1F1716" stroke-width="2.5" stroke-linecap="round"/>
          <path d="M59 23 L64 28 L59 33" stroke="#1F1716" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          <!-- Text lines (transcription output) -->
          <rect x="54" y="48" width="20" height="3" rx="1.5" fill="#9C5230"/>
          <rect x="54" y="55" width="16" height="3" rx="1.5" fill="#9C5230" opacity="0.7"/>
          <rect x="54" y="62" width="18" height="3" rx="1.5" fill="#9C5230" opacity="0.5"/>
          <!-- Small doc -->
          <rect x="48" y="44" width="28" height="26" rx="3" fill="none" stroke="#1F1716" stroke-width="2"/>
          <path d="M66 44 L72 50" stroke="#1F1716" stroke-width="2" stroke-linecap="round"/>
          <rect x="66" y="44" width="6" height="6" rx="1" fill="#F4E8DA" stroke="#1F1716" stroke-width="1.5"/>
        </svg>`,
  '03': `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- Warning triangle -->
          <path d="M28 58 L8 58 L18 38Z" fill="#FFBE56" stroke="#1F1716" stroke-width="2.5" stroke-linejoin="round"/>
          <path d="M18 45 L18 50" stroke="#1F1716" stroke-width="2.5" stroke-linecap="round"/>
          <circle cx="18" cy="54" r="1.5" fill="#1F1716"/>
          <!-- Document with lines -->
          <rect x="30" y="14" width="30" height="38" rx="4" fill="#F4E8DA" stroke="#1F1716" stroke-width="2.5"/>
          <line x1="37" y1="24" x2="53" y2="24" stroke="#897465" stroke-width="2" stroke-linecap="round"/>
          <line x1="37" y1="30" x2="53" y2="30" stroke="#897465" stroke-width="2" stroke-linecap="round"/>
          <line x1="37" y1="36" x2="47" y2="36" stroke="#897465" stroke-width="2" stroke-linecap="round"/>
          <!-- Highlight line in copper -->
          <line x1="37" y1="42" x2="53" y2="42" stroke="#9C5230" stroke-width="2.5" stroke-linecap="round"/>
          <!-- Magnifying glass -->
          <circle cx="54" cy="54" r="12" fill="none" stroke="#1F1716" stroke-width="3"/>
          <circle cx="54" cy="54" r="8" fill="rgba(78,123,124,0.25)" stroke="none"/>
          <line x1="63" y1="63" x2="72" y2="72" stroke="#1F1716" stroke-width="3.5" stroke-linecap="round"/>
          <!-- Dot inside lens = found signal -->
          <circle cx="54" cy="54" r="3" fill="#FFBE56" stroke="#1F1716" stroke-width="1.5"/>
        </svg>`,
  '04': `<svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- Monitor -->
          <rect x="8" y="14" width="52" height="36" rx="4" fill="#1F1716" stroke="#1F1716" stroke-width="2.5"/>
          <rect x="11" y="17" width="46" height="30" rx="2" fill="#4E7B7C"/>
          <!-- Screen content: bar charts -->
          <rect x="16" y="36" width="6" height="8" rx="1" fill="#FFBE56"/>
          <rect x="25" y="30" width="6" height="14" rx="1" fill="#9C5230"/>
          <rect x="34" y="33" width="6" height="11" rx="1" fill="#FFBE56" opacity="0.7"/>
          <rect x="43" y="26" width="6" height="18" rx="1" fill="#FFC9A2"/>
          <!-- Screen divider -->
          <line x1="11" y1="27" x2="57" y2="27" stroke="rgba(244,232,218,0.2)" stroke-width="1"/>
          <!-- Small label dots -->
          <circle cx="16" cy="23" r="2" fill="#FFBE56"/>
          <circle cx="23" cy="23" r="2" fill="#9C5230"/>
          <circle cx="30" cy="23" r="2" fill="#4E7B7C"/>
          <!-- Monitor stand -->
          <path d="M28 50 L28 58 L20 62 L48 62 L40 58 L40 50Z" fill="#897465" stroke="#1F1716" stroke-width="2"/>
          <!-- Canary bird perched top-right of screen -->
          <ellipse cx="66" cy="22" rx="7" ry="6" fill="#FFBE56" stroke="#1F1716" stroke-width="2"/>
          <circle cx="69" cy="19" r="4" fill="#FFBE56" stroke="#1F1716" stroke-width="2"/>
          <circle cx="70.5" cy="18" r="1" fill="#1F1716"/>
          <path d="M72 20 L75 21 L72 22Z" fill="#9C5230" stroke="#1F1716" stroke-width="1"/>
          <!-- Canary feet -->
          <line x1="64" y1="28" x2="62" y2="32" stroke="#1F1716" stroke-width="1.5" stroke-linecap="round"/>
          <line x1="67" y1="28" x2="68" y2="32" stroke="#1F1716" stroke-width="1.5" stroke-linecap="round"/>
        </svg>`,
};

export default function WorkflowStepIcon({ step }: WorkflowStepIconProps) {
  const html = ICON_HTML[step] ?? ICON_HTML['01'];
  return (
    <span className="step-icon" aria-hidden dangerouslySetInnerHTML={{ __html: html }} />
  );
}
