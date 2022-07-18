<script context="module">
	export const prerender = true;
</script>

<svelte:head>
	<title>About | Symbol Bucket</title>
</svelte:head>

<div class="p-8">
	<div class="max-w-2xl mx-auto">
		<h1 class="text-center font-black text-4xl py-8">About</h1>
		<ul>
			<li>
				<h2>What is Symbol Bucket?</h2>
				<p>
					This website is dedicated to the uploads and sharing of Symbol Arts, a unique messaging
					format within the game <a target="_blank" href="https://ngs.pso2.com/"
						>Phantasy Star Online 2: New Genesis</a
					>
					(PSO2:NGS). You can read the Symbol Art page within the official site's game manual
					<a target="_blank" href="https://pso2.com/players/manual/pso2/communication/symbolart/"
						>here</a
					>.
				</p>
			</li>
			<li>
				<h2>Where can I find my Symbol Arts (<code>.sar</code> files) to upload?</h2>
				<p>
					Symbol Arts are stored within the game's <code>symbolarts</code> directory, located within
					the user's Documents folder in the <code>SEGA</code> directory. This is only available on the
					PC version.
				</p>
				<div class="pt-4">
					<img
						src="/res/images/symbolarts-location.png"
						alt="Screenshot of User's Symbol Arts folder in Explorer."
					/>
				</div>
			</li>
			<li>
				<h2>How do I import Symbol Arts in-game?</h2>
				<p>
					Place your downloaded <code>.sar</code> file in the game's <code>symbolarts/import</code> directory.
					In-game, navigate to the Symbol Art menu, select the "Import" tab, and click the "Import" box
					to load all imported Symbol Arts. Feel free to refer to the images below.
				</p>
				<div class="pt-4">
					<div class="collapse bg-neutral rounded-box">
						<input type="checkbox" />
						<div class="collapse-title text-xl font-medium text-neutral-content">
							Show/Hide Images
						</div>
						<div class="collapse-content flex flex-col gap-4">
							<img src="/res/images/step-1.png" alt="Step 1" />
							<img src="/res/images/step-2.png" alt="Step 1" />
							<img src="/res/images/step-3.png" alt="Step 1" />
							<img src="/res/images/step-4.png" alt="Step 1" />
						</div>
					</div>
				</div>
			</li>
			<li>
				<h2>Who created this website?</h2>
				<p>
					It's just me, <a target="_blank" href="https://twitter.com/jojobii_">@jojobii</a>
					on Twitter! If you want to contribute, the code for this website is on GitHub
					<a target="_blank" href="https://github.com/arks-moe/symbol-bucket">here</a>. If you want
					to reach out, feel free to do so via Twitter DM or email,
					<a href="mailto:jojobii.arks@gmail.com">jojobii.arks@gmail.com</a>.
				</p>
			</li>
			<li>
				<h2>How do I report malicious posts?</h2>
				<p>
					There are no solid moderation tools at the moment. In the meantime, feel free to reach out
					to me with one of the provided contact methods above and I can deal stuff manually. 👍
				</p>
			</li>
		</ul>
		<div class="divider" />
		<h1 id="disclaimer" class="text-center font-black text-3xl py-8">Disclaimer</h1>
		<p>
			This site aims to provide a sharing platform for Symbol Arts (<code>.sar</code> files) from
			the game
			<a target="_blank" href="https://ngs.pso2.com/">Phantasy Star Online 2: New Genesis</a> by &copy;SEGA.
			All posts can be made anyone with a Twitter account without any review prior to submission. I cannot
			guarantee this site will be free from malicious posts. Please report any issues you have to me,
			jojobii, through the contact methods above.
		</p>
		<h1 id="copyright" class="text-center font-black text-3xl py-8">Copyright</h1>
		<p class="italic">
			&copy;SEGA PHANTASY STAR ONLINE 2
			<br />
			All rights to the copyrighted works (images, data, audios, texts, etc.) used in PSO2 are owned
			by SEGA Games Co. Ltd.
			<br />
			All other trademarks, logos and copyrights are property of their respective owners
		</p>
	</div>
</div>

<style>
	a {
		@apply link;
	}
	img {
		@apply rounded-box;
	}
	li {
		@apply py-6;
	}
	h2 {
		@apply font-bold text-xl pb-4;
	}
</style>
