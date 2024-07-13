document.addEventListener('DOMContentLoaded', function() {
    const chatDisplay = document.getElementById('chat-display');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const resetBtn = document.getElementById('reset-btn');
    const sidenav = document.querySelector('.sidenav');

    // Inicializa el menú deslizable
    const elems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems);

    // Partículas de fondo
    particlesJS.load('particles-js', 'particles-config.js', function() {
        console.log('Partículas cargadas.');
    });

    let isPlaying = false;
    const audioElement = new Audio();

    // Variables para contexto y personalización
    let userName = 'usuario';
    let context = [];

    // Función para agregar un mensaje al chat
    function addMessageToChat(message, sender, avatarUrl, isUser) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', `${sender}-message`);

        const avatar = document.createElement('img');
        avatar.src = avatarUrl;
        avatar.classList.add('avatar');

        const messageText = document.createElement('p');
        messageText.classList.add('message-text');
        messageText.innerHTML = message;

        messageElement.appendChild(avatar);
        messageElement.appendChild(messageText);

        if (!isUser) {
            const audioIcon = document.createElement('i');
            audioIcon.classList.add('material-icons', 'audio-icon');
            audioIcon.textContent = 'volume_up';
            audioIcon.addEventListener('click', () => {
                if (isPlaying) {
                    audioElement.pause();
                    isPlaying = false;
                } else {
                    const utterance = new SpeechSynthesisUtterance(message);
                    window.speechSynthesis.speak(utterance);
                    isPlaying = true;
                    utterance.onend = () => isPlaying = false;
                }
            });

            messageText.appendChild(audioIcon);
        }

        chatDisplay.appendChild(messageElement);
        chatDisplay.scrollTop = chatDisplay.scrollHeight;

        saveConversation(message, sender);
    }

    // Función para encontrar la mejor coincidencia
    function findBestMatch(responses, userMessage) {
        let bestMatch = null;
        let highestSimilarity = 0;

        responses.forEach(response => {
            response.input_patterns.forEach(pattern => {
                const similarity = stringSimilarity.compareTwoStrings(userMessage.toLowerCase(), pattern.toLowerCase());
                if (similarity > highestSimilarity) {
                    highestSimilarity = similarity;
                    bestMatch = response;
                }
            });
        });

        return bestMatch;
    }

    // Función para encontrar palabras similares
    function findSimilarWordMatch(responses, userMessage) {
        const userWords = userMessage.toLowerCase().split(' ');

        for (let response of responses) {
            for (let pattern of response.input_patterns) {
                const responseWords = pattern.toLowerCase().split(' ');

                for (let userWord of userWords) {
                    for (let responseWord of responseWords) {
                        const similarity = stringSimilarity.compareTwoStrings(userWord, responseWord);
                        if (similarity > 0.8) {
                            return response;
                        }
                    }
                }
            }
        }

        return null;
    }

    // Función para guardar el historial de conversaciones
    function saveConversation(message, sender) {
        const conversation = JSON.parse(localStorage.getItem('conversation')) || [];
        conversation.push({ message, sender });
        localStorage.setItem('conversation', JSON.stringify(conversation));
    }

    // Función para cargar el historial de conversaciones
    function loadConversation() {
        const conversation = JSON.parse(localStorage.getItem('conversation')) || [];
        conversation.forEach(({ message, sender }) => {
            const avatarUrl = sender === 'user'
                ? 'https://images.stockcake.com/public/b/c/2/bc2be164-b247-47e4-b02b-5b53b348f6dc_large/cloud-computing-concept-stockcake.jpg'
                : 'https://images.stockcake.com/public/8/5/b/85bcbe14-4d6f-4954-82b4-00a52b967a65_large/neural-network-visualization-stockcake.jpg';
            addMessageToChat(message, sender, avatarUrl, sender === 'user');
        });
    }

    // Función para manejar el envío de mensajes
    sendBtn.addEventListener('click', function() {
        const userMessage = userInput.value.trim();
        if (userMessage !== '') {
            addMessageToChat(userMessage, 'user', 'https://images.stockcake.com/public/b/c/2/bc2be164-b247-47e4-b02b-5b53b348f6dc_large/cloud-computing-concept-stockcake.jpg', true);
            userInput.value = '';

            // Simula que la IA está escribiendo
            const typingIndicator = document.createElement('div');
            typingIndicator.id = 'typing-indicator';
            typingIndicator.textContent = 'Dani está escribiendo...';
            chatDisplay.appendChild(typingIndicator);
            chatDisplay.scrollTop = chatDisplay.scrollHeight;

            // Simula una respuesta de la IA
            setTimeout(() => {
                chatDisplay.removeChild(typingIndicator);
                fetch('https://raw.githubusercontent.com/ryuuleiko/DANI-IA/main/response.json')
                    .then(response => response.json())
                    .then(data => {
                        const responses = data.responses;

                        // Encuentra la mejor coincidencia
                        let bestMatch = findBestMatch(responses, userMessage);

                        // Si no hay una coincidencia exacta, busca una palabra similar
                        if (!bestMatch) {
                            bestMatch = findSimilarWordMatch(responses, userMessage);
                        }

                        // Si hay coincidencia, usa los campos adicionales para enriquecer la respuesta
                        if (bestMatch) {
                            let enrichedResponse = bestMatch.output;
                            if (bestMatch.additional_info) {
                                enrichedResponse += `\n${bestMatch.additional_info.recommendations}`;
                            }
                            addMessageToChat(enrichedResponse, 'bot', 'https://images.stockcake.com/public/8/5/b/85bcbe14-4d6f-4954-82b4-00a52b967a65_large/neural-network-visualization-stockcake.jpg', false);
                        } else {
                            addMessageToChat(getRandomFallbackResponse(), 'bot', 'https://images.stockcake.com/public/8/5/b/85bcbe14-4d6f-4954-82b4-00a52b967a65_large/neural-network-visualization-stockcake.jpg', false);
                        }
                    });
            }, 2000);
        }
    });

    // Función para obtener una respuesta aleatoria predeterminada
    function getRandomFallbackResponse() {
        const fallbackResponses = [
            'Lo siento, no entiendo tu pregunta.',
            '¿Podrías reformular eso?',
            'No estoy seguro de cómo responder a eso.',
            'Hmm, interesante pregunta.'
        ];
        return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
    }

    resetBtn.addEventListener('click', function() {
        chatDisplay.innerHTML = '';
        localStorage.removeItem('conversation');
    });

    // Envía mensaje con la tecla Enter
    userInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            sendBtn.click();
        }
    });

    // Carga el historial de conversaciones al iniciar
    loadConversation();
});
