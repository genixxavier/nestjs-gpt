import OpenAI from 'openai';

interface Options {
  prompt: string;
  maxTokens?: number;
}

export const orthographyCheckUseCase = async (
  openai: OpenAI,
  options: Options,
) => {
  const { prompt } = options;

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: `
        Te será proveidos varios textos. Tu tarea es corregir los errores ortográficos que encuentres.
        Si no encuentras errores, escribe "No hay errores".
        Debes de respoder en formato JSON con la siguiente estructura:
        {
          "userScore": 0.5,
          "errores": [
            {
              "error": "Texto con errores",
              "solucion": "Texto corregido"
            }
          ],
          "message": "Mensaje adicional"
        }
        `,
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    temperature: 0.3,
    max_tokens: 150,
  });

  console.log(completion);

  const jsonResponde = JSON.parse(completion.choices[0].message.content);
  return jsonResponde;
};
