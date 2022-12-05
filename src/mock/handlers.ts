import { rest } from 'msw';
import { API_URL } from '../app/constants';

const data = [
	{
	  quote: "These are my only friends...grown-up nerds like Gore Vidal. And even he's kissed more boys than I ever will.",
	  character: "Lisa Simpson",
	  image: "https://cdn.glitch.com/3c3ffadc-3406-4440-bb95-d40ec8fcde72%2FLisaSimpson.png?1497567512083",
	  characterDirection: "Right"
	}
]



const handlers = [
	rest.get(API_URL, (req, res, ctx) => {
		if (req.url.searchParams.get("character")) {
			return res(
				ctx.status(200),
				ctx.json([
					{
						quote: "Shut up, brain. I got friends now. I don't need you anymore.",
						character: "Lisa Simpson",
						image: "https://cdn.glitch.com/3c3ffadc-3406-4440-bb95-d40ec8fcde72%2FLisaSimpson.png?1497567512083",
						characterDirection: "Right"
					}
				])
			)
		}
		return res(
			ctx.status(200),
			ctx.json([
				{
					quote: "And this is the snack holder where I can put my beverage or, if you will, cupcake.",
					character: "Homer Simpson",
					image: "https://cdn.glitch.com/3c3ffadc-3406-4440-bb95-d40ec8fcde72%2FHomerSimpson.png?1497567511939",
					characterDirection: "Right"
				}
			])
		);
	}),
];

export { handlers, data };