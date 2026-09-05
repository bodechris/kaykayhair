import HeroSliderV0 from "@/components/HeroSliderV0/HeroSliderV0";
import HeroSlideV0 from "@/components/HeroSliderV0/HeroSlideV0";
import styled from "styled-components";

export default function Home() {
  return (
    <HomePageWrapper>
      <HeroSliderV0>
        <HeroSlideV0
          mainCss={{ 
            background: 'radial-gradient(circle at center, #ffffff 0%, #fff 10%, #dda0be 100%)',
            '.hero-description span': {
              background: '#dd3f6f'
            }, 
          }}
          title="Glow like the African queen that you are."
          mainDesignText={{
            text1: "Glow",
            text2: "like the",
            text3: "African Queen",
            text4: "that you are.",
            component: "DesignText1",
          }}
          description="Premium installs, styling, treatments, makeup, nails and beauty care for women who want to look polished every day."
          primaryCta={{ href: '/services', label: 'Book Your Glow-Up' }}
          secondaryCta={{ href: '/lookbook', label: 'See the LookBook' }}
          media={{ fg: '/images/hero/slide-1-img.webp', alt: 'KayKay Hair signature style' }}
          priority
          secondaryDesignText={[
            {
              text1: "Luxury Wig Installs",
              description: "Experience the epitome of elegance with our luxury wig installs, where flawless lace, secure fit, and a maintenance rhythm keep your look fresh without the stress.",
              ctas: [
                { href: '/book', label: 'Reserve Your Session' },
              ],
              component: "DesignText3",
            },
            {
              text1: "CarePlus Beauty Club",
              customStyles: {
                transform: 'translateY(150%)',
              },
              description: "Join the CarePlus Beauty Club for exclusive access to our premium hair care products, expert tips, and personalized support to keep your hair looking its best between salon visits.",
              ctas: [
                { href: '/care-plus', label: 'Join Now' },
              ],
              component: "DesignText3",
            },
          ]}
        />
        <HeroSlideV0
          mainCss={{ 
            background: '#d84f18dd',
            ".hero-bg-media": {
              opacity: 0.5,
            }
           }}
          title="Luxury wig installs with maintenance built in."
          mainDesignText={{
            text1: "Luxury wig installs",
            text2: "with maintenance built in.",
            colors: ["#fff", "#ffdac4"],
            component: "DesignText1",
          }}
          description="Flawless lace, secure fit, and a maintenance rhythm that keeps your look fresh without the stress."
          primaryCta={{ href: '/book', label: 'Reserve Your Session' }}
          secondaryCta={{ href: '/care-plus', label: 'Explore Care Plus' }}
          media={{ fg: '/images/hero/slide-2-img.webp', bg: '/images/hero/slide-2-bg.webp', alt: 'Luxury wig install styling' }}
        />
        <HeroSlideV0
          mainCss={{ 
            background: "#c6612ccc",
            ".hero-bg-media": {
              opacity: 0.7,
            }
          }}
          title="All the luxury, none of the stress."
          mainDesignText={{
            text1: "All the luxury,",
            text2: "none of the stress.",
            component: "DesignText1",
          }}
          description="Bring your own wig or choose from our curated collection of premium units. Our expert stylists will install and maintain your wig for a flawless look that lasts."
          primaryCta={{ href: '/book', label: 'Reserve Your Session' }}
          secondaryCta={{ href: '/services', label: 'Learn More' }}
          media={{ fg: '/images/hero/slide-3-img.webp', bg: '/images/hero/slide-3-bg.webp', alt: 'Best wig care services' }}
        />
        <HeroSlideV0
          mainCss={{ 
            background: "#aa114ccc",
            ".hero-bg-media": {
              opacity: 0.5,
            }
          }}
          title="All the luxury, none of the stress."
          mainDesignText={{
            text1: "All the luxury,",
            text2: "none of the stress.",
            component: "DesignText1",
          }}
          description="Bring your own wig or choose from our curated collection of premium units. Our expert stylists will install and maintain your wig for a flawless look that lasts."
          primaryCta={{ href: '/book', label: 'Reserve Your Session' }}
          secondaryCta={{ href: '/services', label: 'Learn More' }}
          media={{ fg: '/images/hero/slide-4-img.webp', bg: '/images/hero/slide-4-bg.webp', alt: 'Best wig care services' }}
        />
        <HeroSlideV0
          mainCss={{ 
            background: "#525244cc",
            ".hero-bg-media": {
              opacity: 0.5,
            }
          }}
          title="All the luxury, none of the stress."
          mainDesignText={{
            text1: "All the luxury,",
            text2: "none of the stress.",
            component: "DesignText1",
          }}
          description="Bring your own wig or choose from our curated collection of premium units. Our expert stylists will install and maintain your wig for a flawless look that lasts."
          primaryCta={{ href: '/book', label: 'Reserve Your Session' }}
          secondaryCta={{ href: '/services', label: 'Learn More' }}
          media={{ fg: '/images/hero/slide-5-img.webp', bg: '/images/hero/slide-5-bg.webp', alt: 'Best wig care services' }}
        />
        <HeroSlideV0
          mainCss={{ 
            background: "#422918cc",
            ".hero-bg-media": {
              opacity: 0.5,
            }
          }}
          title="All the luxury, none of the stress."
          mainDesignText={{
            text1: "All the luxury,",
            text2: "none of the stress.",
            component: "DesignText1",
          }}
          description="Bring your own wig or choose from our curated collection of premium units. Our expert stylists will install and maintain your wig for a flawless look that lasts."
          primaryCta={{ href: '/book', label: 'Reserve Your Session' }}
          secondaryCta={{ href: '/services', label: 'Learn More' }}
          media={{ fg: '/images/hero/slide-6-img.webp', bg: '/images/hero/slide-6-bg.webp', alt: 'Best wig care services' }}
        />
        <HeroSlideV0
          mainCss={{ 
            background: "#db7b45dd",
            ".hero-bg-media": {
              opacity: 0.5,
            }
          }}
          title="All the luxury, none of the stress."
          mainDesignText={{
            text1: "All the luxury,",
            text2: "none of the stress.",
            component: "DesignText1",
          }}
          description="Bring your own wig or choose from our curated collection of premium units. Our expert stylists will install and maintain your wig for a flawless look that lasts."
          primaryCta={{ href: '/book', label: 'Reserve Your Session' }}
          secondaryCta={{ href: '/services', label: 'Learn More' }}
          media={{ fg: '/images/hero/slide-7-img.webp', bg: '/images/hero/slide-7-bg.webp', alt: 'Best wig care services' }}
        />
      </HeroSliderV0>
    </HomePageWrapper>
  );
}

const HomePageWrapper = styled.div`
  display: flex;
  margin: 0 auto;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 0;
`;
