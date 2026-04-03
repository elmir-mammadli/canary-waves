import Image from 'next/image';

function ImagePlaceholder({ label }: { label: string }) {
  return (
    <div
      style={{
        width: '100%',
        maxWidth: '664px',
        aspectRatio: '664/448',
        backgroundColor: '#d4b896',
        borderRadius: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <span style={{ color: '#9c5230', fontWeight: 500, fontSize: '14px' }}>{label}</span>
    </div>
  );
}

type ImageFormat = 'avif' | 'jpg' | 'png' | 'webp';

interface FeatureRowProps {
  imageLeft?: boolean;
  h3: string;
  h4: string;
  p: string;
  image: `/images/${string}.${ImageFormat}`;
  imageLabel: string;
}

function FeatureRow({ imageLeft, h3, h4, p, image, imageLabel }: FeatureRowProps) {
  return (
    <div
      className={`flex flex-col ${imageLeft ? 'md:flex-row-reverse' : 'md:flex-row'} items-center`}
    >
      <div className="flex-1 flex flex-col gap-3 px-8">
        <h3
          style={{
            color: '#9c5230',
            fontWeight: 500,
            fontSize: 'clamp(20px, 2vw, 28px)',
            margin: 0,
          }}
        >
          {h3}
        </h3>
        <h4
          style={{
            color: '#1f1716',
            fontWeight: 600,
            fontSize: '20px',
            margin: 0,
          }}
        >
          {h4}
        </h4>
        <p
          style={{
            color: '#1f1716',
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: '1.6em',
            margin: 0,
          }}
        >
          {p}
        </p>
      </div>
      <div style={{ width: '664px', flexShrink: 0, display: 'flex', justifyContent: 'center' }}>
        <Image src={image} alt={imageLabel} width={664} height={448} style={{ width: '664px', height: 'auto', borderRadius: '20px' }} />
      </div>
    </div>
  );
}

export default function Features() {
  const features: FeatureRowProps[] = [
          {
            h3: "Equipment Communication and Collision Prevention",
            h4: "No More Metal-on-Metal.",
            p: "Clear Communication between heavy equipment is key to reducing metal on metal incidents and potential injuries or fatalities. Canary Waves technology helps promote positive equipment passes and situational and spatial awareness. Data can be used to develop positive incentive programs and to ensure compliance with communication safety standards.",
            image: "/images/feature-1.avif",
            imageLabel: "Feature Image 1",
            imageLeft: false,
          },
          {
            h3: "Hazard Identification and Safety Culture Reinforcement",
            h4: "Know the Risk. Own the Fix.",
            p: "Hazard identification is the foundation of any safety program. The next step is hazard mitigation. Canary Waves helps drive value in both categories, providing documentation and logging of safety hazards and mitigating actions to ensure compliance and drive a winning safety culture.",
            image: "/images/feature-2.avif",
            imageLabel: "Feature Image 2",
            imageLeft: true,
          },
          {
            h3: "Contractor Oversight and KPI Monitoring",
            h4: "Track the Work. Hit the KPIs.",
            p: "Contracted services are a huge part of mine site success. Canary Waves technology can help ensure contract terms are being met and KPIs are being delivered by both contract and internal employees alike.",
            image: "/images/feature-3.avif",
            imageLabel: "Feature Image 3",
            imageLeft: false,
          },
        ]
  return (
    <section
      style={{
        backgroundColor: '#f4ebda',
        paddingBottom: '80px',
        paddingLeft: '20px',
        paddingRight: '20px',
      }}
    >
      <div style={{ maxWidth: '1200px' }} className="mx-auto flex flex-col gap-8">
        {
          features.map((feature, index) => (
            <FeatureRow 
            h3={feature.h3}
            h4={feature.h4}
            p={feature.p}
            image={feature.image}
            imageLabel={feature.imageLabel}
            imageLeft={feature.imageLeft}
            key={index}
            />
          ))
        }
        {/* <FeatureRow
          h3="Equipment Communication and Collision Prevention"
          h4="No More Metal-on-Metal."
          p="Clear Communication between heavy equipment is key to reducing metal on metal incidents and potential injuries or fatalities. Canary Waves technology helps promote positive equipment passes and situational and spatial awareness. Data can be used to develop positive incentive programs and to ensure compliance with communication safety standards."
          imageLabel="Feature Image 1"
        />
        <FeatureRow
          imageLeft
          h3="Hazard Identification and Safety Culture Reinforcement"
          h4="Know the Risk. Own the Fix."
          p="Hazard identification is the foundation of any safety program. The next step is hazard mitigation. Canary Waves helps drive value in both categories, providing documentation and logging of safety hazards and mitigating actions to ensure compliance and drive a winning safety culture."
          imageLabel="Feature Image 2"
        />
        <FeatureRow
          h3="Contractor Oversight and KPI Monitoring"
          h4="Track the Work. Hit the KPIs."
          p="Contracted services are a huge part of mine site success. Canary Waves technology can help ensure contract terms are being met and KPIs are being delivered by both contract and internal employees alike."
          imageLabel="Feature Image 3"
        /> */}
      </div>
    </section>
  );
}
