<script>
	import BenefitSection from '$lib/components/landing/Benefits/BenefitSection.svelte';
	import FaqSection from '$lib/components/landing/Faq/FaqSection.svelte';
	import FeatureSection from '$lib/components/landing/Feature/FeatureSection.svelte';
	import Footer from '$lib/components/landing/Footer/Footer.svelte';
	import HeroSection from '$lib/components/landing/Hero/HeroSection.svelte';
	import NewsletterSection from '$lib/components/landing/Newsletter/NewsletterSection.svelte';
	import PricingSection from '$lib/components/landing/Pricing/PricingSection.svelte';
</script>

<div id="home">
	<HeroSection />
</div>
<div id="benefits">
	<BenefitSection />
</div>
<div id="features">
	<FeatureSection />
</div>
<div id="pricing">
	<PricingSection />
</div>
<div id="faq">
	<FaqSection />
</div>
<div id="newsletter">
	<NewsletterSection />
</div>
<div id="contact">
	<Footer />
</div>