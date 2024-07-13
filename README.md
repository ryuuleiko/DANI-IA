# DANI (Declarative Artificial Neural Intelligence)

DANI es una interfaz de chatbot inteligente que permite a los usuarios interactuar con una IA que proporciona respuestas basadas en un archivo JSON. Este proyecto utiliza varias bibliotecas y tecnologías para mejorar la experiencia del usuario y proporcionar respuestas contextuales.

## Características

- **Interfaz de usuario moderna**: Utiliza Materialize CSS para un diseño atractivo y fácil de usar.
- **Respuestas dinámicas**: Las respuestas se generan a partir de un archivo JSON que contiene patrones de entrada y salida.
- **Compatibilidad con texto sin acentos**: La IA es capaz de entender y responder a preguntas aunque se introduzcan sin acentos.
- **Icono de audio**: Los usuarios pueden escuchar las respuestas mediante un botón de audio al lado de cada respuesta.
- **Menú deslizable**: Acceso rápido a opciones adicionales como ayuda e información.
- **Simulación de escritura**: Las respuestas se muestran como si la IA estuviera escribiendo en tiempo real.
- **Partículas de fondo**: Añade un efecto visual atractivo al fondo de la página.

## Tecnologías Utilizadas

- **HTML5**: Estructura de la aplicación.
- **CSS3**: Estilos visuales usando Materialize CSS y animaciones de partículas.
- **JavaScript**: Lógica de la aplicación y manejo de eventos.
- **JSON**: Fuente de datos para las respuestas de la IA.
- **Materialize CSS**: Framework de diseño para una interfaz moderna.
- **particles.js**: Para efectos de partículas de fondo.

## Instalación

1. Clona el repositorio:
    ```bash
    git clone https://github.com/ryuuleiko/DANI-IA.git
    ```

2. Navega al directorio del proyecto:
    ```bash
    cd DANI-IA
    ```

3. Abre `index.html` en tu navegador favorito.

## Configuración

1. **Archivo JSON**: Asegúrate de tener un archivo `responses.json` con la estructura adecuada y súbelo a GitHub. Actualiza la URL en el archivo `script.js` para que apunte a tu archivo JSON.

    ```json
    {
        "responses": [
            {
                "input_patterns": ["Hola", "Buenos días", "Buenas tardes", "Buenas noches"],
                "output": "¡Hola! ¿Cómo estás?",
                "context": "saludo",
                "mood": "neutral",
                "additional_info": {
                    "recommendations": "Puedes preguntarme sobre el clima, noticias, o cualquier otra cosa.",
                    "related_topics": ["buenos días", "buenas tardes", "buenas noches"],
                    "possible_scenarios": ["¿Cómo te llamas?", "¿Qué puedes hacer?", "Dime una broma"]
                }
            },
            {
                "input_patterns": ["¿Cómo estás?", "¿Cómo te sientes?", "¿Qué tal?"],
                "output": "Estoy aquí para ayudarte con lo que necesites.",
                "context": "estado",
                "mood": "neutral",
                "additional_info": {
                    "recommendations": "Puedes preguntarme sobre tecnología, medicina o psicología.",
                    "related_topics": ["estado de ánimo", "sentimientos"],
                    "possible_scenarios": ["¿Estás bien?", "¿Qué te pasa?", "¿Te sientes bien?"]
                }
            }
        ]
    }
    ```

## Uso

1. **Interacción**: Escribe un mensaje en el campo de entrada y presiona "Enviar" para interactuar con DANI.
2. **Audio**: Haz clic en el icono de audio junto a las respuestas para escuchar la respuesta en voz alta.
3. **Menú deslizable**: Haz clic en el icono del menú para acceder a opciones adicionales.

## Contribución

1. Haz un fork del proyecto.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit (`git commit -am 'Añadir nueva funcionalidad'`).
4. Haz push a la rama (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

## Licencia

Este proyecto tiene una licencia cerrada para uso no comercial y no modificable.

## Próximas Funcionalidades

Próximamente se añadirá una interfaz web en la cual DANI será el centro de todo. Esta interfaz incluirá:

- Registro de usuario.
- Nuevas herramientas web.
- Otras características para mejorar la experiencia del usuario.

## Créditos

- [Materialize CSS](https://materializecss.com/)
- [particles.js](https://vincentgarreau.com/particles.js/)
- [string-similarity.min.js (CDN)](https://cdnjs.cloudflare.com/ajax/libs/string-similarity/4.0.4/string-similarity.min.js)

---

¡Gracias por usar DANI! Si tienes alguna pregunta o sugerencia, no dudes en abrir un issue o contactarme.
