<script lang="ts">
	const footerLinks = [
		{
			column1: [
				{ id: 1, title: 'About', url: '#' },
				{ id: 2, title: 'Contact', url: '#' },
				{ id: 3, title: 'Blog', url: '#' },
				{ id: 4, title: 'Story', url: '#' }
				/* You can add more  */
			],
			column2: [
				{ id: 5, title: 'Company', url: '#' },
				{ id: 6, title: 'Product', url: '#' },
				{ id: 7, title: 'Press', url: '#' },
				{ id: 8, title: 'More', url: '#' }
			],
			column3: [
				{ id: 9, title: 'Press', url: '#' },
				{ id: 10, title: 'Careers', url: '#' },
				{ id: 11, title: 'Newsletters', url: '#' },
				{ id: 12, title: 'More', url: '#' }
			]
		}
	];
</script>

<div class="footer pt-10 pb-20 bg-[#F7F7F7]">
	<div
		class="footer-headline mx-auto max-w-5xl pt-10 flex flex-col md:flex-row lg:gap-x-10 md:items-center md:justify-between px-8 lg:px-20 xl:px-0"
	>
		<div class="left-footer-part md:w-1/3 flex flex-col justify-start items-start">
			<button>
				<div class="header-logo flex items-center space-x-2">
					<h2 class="text-black font-bold">Incln</h2>
				</div>
			</button>
			<p class="text-black/60 text-sm mt-5 max-w-xs font-[400]">
				What matters is productivity with fun culture
			</p>
		</div>

		<div class="right-footer-part pt-5 md:w-2/3">
			<div class="flex gap-x-3 items-center justify-between px-0 lg:px-10">
				{#each Object.keys(footerLinks[0]) as columnKey}
					<ul class="footer-link-list  text-sm font-medium flex flex-col gap-y-2">
						{#each footerLinks[0][columnKey as keyof typeof footerLinks[0]] as link}
							<li
								class="footer-link-item text-black/50 hover:text-black transition-all duration-300 ease-in-out flex items-center gap-x-2"
							>
								<a href={link.url}>{link.title}</a>
							</li>
						{/each}
					</ul>
				{/each}
			</div>
		</div>
	</div>
</div>
