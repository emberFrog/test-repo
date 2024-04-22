<script lang="ts">
	let currencyIn: string = 'USD'
	let currencyOut: string = 'RUB'
	let amountIn: number = 0
	let amountOut: number = 0
	$: amountOut

	const API_TOKEN = import.meta.env.VITE_API_TOKEN

	async function convertCurrency(): Promise<void> {
		if (!currencyIn || !currencyOut || !amountIn) return

		try {
			const response = await fetch(
				`https://v6.exchangerate-api.com/v6/latest/${currencyIn}`,
				{
					headers: {
						Authorization: `Bearer ${API_TOKEN}`,
					},
				}
			)
			const data: { conversion_rates: { [key: string]: number } } =
				await response.json()
			const rate = data.conversion_rates[currencyOut]
			amountOut = amountIn * rate
		} catch (error) {
			console.error('Error: currency conversion', error)
		}
	}
</script>

<main class="wrapper">
	<header>
		<h1>Currency converter app</h1>
		<p>Created by Nikita Polianskii</p>
	</header>

	<section class="inputSection">
		<fieldset>
			<label for="curr-from">FROM</label>
			<input
				id="curr-from"
				name="curr-from"
				type="text"
				bind:value={currencyIn}
				on:input={convertCurrency}
			/>
			<label for="curr-to">TO</label>
			<input
				id="curr-to"
				name="curr-to"
				type="text"
				bind:value={currencyOut}
				on:input={convertCurrency}
			/>
		</fieldset>
		<fieldset>
			<label for="amount">AMOUNT</label>
			<input
				id="amount"
				name="amount"
				type="number"
				min="0"
				bind:value={amountIn}
				on:input={convertCurrency}
			/>
			<label for="converted">CONVERTED</label>
			<input
				id="converted"
				name="converted"
				type="number"
				bind:value={amountOut}
			/>
		</fieldset>
	</section>
</main>

<style>
	.wrapper {
		background-color: #1b1b32;
		color: #f5f6f7;
		border-radius: 20px;
		font-family: Tahoma;
		font-size: 16px;
		width: 100%;
		height: 100vh;
	}

	header {
		padding: 40px;
	}

	h1 {
		margin: 1em auto;
		text-align: center;
	}

	fieldset {
		border: none;
		padding: 1rem 0;
	}

	label {
		display: block;
		margin: 0.5rem 0;
	}

	input {
		margin: 0;
		width: 60%;
		min-height: 2em;
		background-color: #0a0a23;
		border: 1px solid #0a0a23;
		color: #ffffff;
	}
</style>
