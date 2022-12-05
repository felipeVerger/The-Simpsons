import { waitFor, screen, waitForElementToBeRemoved } from "@testing-library/react";
import { render } from "../../test-utils";
import userEvent from '@testing-library/user-event'

import Cita from "./Cita";

describe("Quote component tests", () => {
    test('When the component is mounted the text should be the expected', () => {
        render(<Cita/>)
        expect(screen.queryByText("No se encontro ninguna cita")).toHaveTextContent("No se encontro ninguna cita");
    })

    test('The inital text of the button must be the expected', () => {
        render(<Cita/>)
        expect(screen.queryByText("Obtener cita aleatoria")).toHaveTextContent("Obtener cita aleatoria");
    })

    test('When we search for a quote the text loading must appear until it is resolved', async () => {
        render(<Cita/>)

        await userEvent.click(screen.getByText("Obtener cita aleatoria"));
        expect(await screen.findByText("CARGANDO...")).toBeInTheDocument()
    })

    test('When the request is resolved the loading text must disappear', async () => {
        render(<Cita/>)
        const input = screen.getByPlaceholderText("Ingresa el nombre del autor");
        await userEvent.type(input, "Montgomery Burns");

        const button = screen.getByText("Obtener Cita");
        await userEvent.click(button);

        await waitForElementToBeRemoved(() => screen.queryByText("CARGANDO..."))
    })

    test('should change the value of the input', async () => {
        render(<Cita/>)

        const input = screen.getByPlaceholderText("Ingresa el nombre del autor");
        await userEvent.type(input, "Montgomery Burns");
        expect(input).toHaveValue("Montgomery Burns");
    })

    test('If we try to search a quote with a wrong text input it should return a error message', async () => {
            render(<Cita/>)
            const input = screen.getByPlaceholderText("Ingresa el nombre del autor");
            await userEvent.type(input, "2")

            const button = screen.getByText("Obtener Cita");
            await userEvent.click(button);

            await waitFor(() => expect(screen.queryByText("Por favor ingrese un nombre válido")).toHaveTextContent(/Por favor ingrese un nombre válido/i))
    })

    test('if we enter some text in the input the button must have the expected text', async () => {
        render(<Cita/>)

        const input = screen.getByPlaceholderText("Ingresa el nombre del autor");
        await userEvent.type(input, "homer");

        await waitFor(() => expect(screen.queryByText("Obtener Cita")).toHaveTextContent(/Obtener Cita/i));
    })

    test('If we search for a random quote, the quote owner should appear in the document', async () => {
        render(<Cita/>)

        const button = screen.getByText("Obtener cita aleatoria");
        await userEvent.click(button);

        const quoteOwner = await screen.findByText("Homer Simpson");
        await waitFor(() => expect(quoteOwner).toBeInTheDocument());
    })

    test('If we search for a random quote, some quote should appear in the document', async () => {
        render(<Cita/>)

        const button = screen.getByText("Obtener cita aleatoria");
        await userEvent.click(button);

        const quote = await screen.findByText("And this is the snack holder where I can put my beverage or, if you will, cupcake.");
        await waitFor(() => expect(quote).toBeInTheDocument());
    })

    test('The API should return one quote and one character', async () => {
        render(<Cita/>)

        const button = await screen.findByText("Obtener cita aleatoria");
        await userEvent.click(button)

        const quote = await screen.findByText("And this is the snack holder where I can put my beverage or, if you will, cupcake.");
        const character = await screen.findByText("Homer Simpson");

        expect(quote).not.toBeNull();
        expect(character).not.toBeNull();
    })

    test('When we search for a quote from a character it should appear the name of the quote owner', async () => {
            render(<Cita/>)
            const input = screen.getByPlaceholderText("Ingresa el nombre del autor");
            await userEvent.type(input, "lisa");

            const button = await screen.findByText("Obtener Cita");
            await userEvent.click(button)
            
            expect(await screen.findByText("Lisa Simpson")).toBeInTheDocument();
    })

    test("When we search for a character quote it should appear a quote from the character we search for", async () => {
        render(<Cita/>)
            const input = screen.getByPlaceholderText("Ingresa el nombre del autor");
            await userEvent.type(input, "lisa");

            const button = await screen.findByText("Obtener Cita");
            await userEvent.click(button)
            
            expect(await screen.findByText("Shut up, brain. I got friends now. I don't need you anymore.")).toBeInTheDocument();
    })

    test("The button 'borrar' must clear the input", async () => {
        render(<Cita/>)

        const input = screen.getByPlaceholderText("Ingresa el nombre del autor");
        await userEvent.type(input, "Homer Simpson");
        expect(input).toHaveValue("Homer Simpson");

        const button = screen.getByText("Borrar");
        await userEvent.click(button);
        expect(input).toHaveValue("");
    })

})