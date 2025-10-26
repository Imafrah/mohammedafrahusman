import React, { useState, useRef, useEffect, useCallback } from 'react';
import { processCommand } from '../utils/commandProcessor';
import { trackCommand } from '../utils/analytics';
import type { HistoryItem, ThemeName, FormState } from '../types';
import { WELCOME_MESSAGES, ASCII_ART, portfolioConfig, emailjsConfig, COMMANDS } from '../constants';

// Inform TypeScript about the global emailjs variable from the script tag
declare var emailjs: any;

export const useTerminal = () => {
    const initialHistory: HistoryItem[] = [{
        command: 'Welcome',
        output: (
            React.createElement('div', null, 
                React.createElement('pre', { className: 'text-sm md:text-base' }, ASCII_ART),
                React.createElement('p', null, portfolioConfig.title),
                React.createElement('br', null),
                WELCOME_MESSAGES.map((msg, index) => React.createElement('p', { key: index }, msg))
            )
        )
    }];

    const [history, setHistory] = useState<HistoryItem[]>(initialHistory);
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState<number>(-1);
    const [inputValue, setInputValue] = useState('');
    const [theme, setTheme] = useState<ThemeName>('matrix');
    const [formState, setFormState] = useState<FormState>({
        step: 'idle',
        data: { name: '', email: '', message: '' },
    });
    const [autoCompleteSuggestions, setAutoCompleteSuggestions] = useState<string[]>([]);
    const [autoCompleteIndex, setAutoCompleteIndex] = useState<number>(0);

    const inputRef = useRef<HTMLInputElement>(null);
    const terminalRef = useRef<HTMLDivElement>(null);

    const focusInput = useCallback(() => {
        inputRef.current?.focus();
    }, []);
    
    useEffect(() => {
        focusInput();
    }, [focusInput]);

    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [history]);

    const sendEmail = async (data: FormState['data']) => {
        if (!emailjsConfig.serviceId || !emailjsConfig.templateId || !emailjsConfig.publicKey || emailjsConfig.publicKey === 'YOUR_PUBLIC_KEY') {
             setHistory(prev => [...prev, { command: '', output: 'Email service is not configured. Please contact the site owner.' }]);
             setFormState({ step: 'idle', data: { name: '', email: '', message: '' } });
             return;
        }
        
        const templateParams = {
            from_name: data.name,
            from_email: data.email,
            to_name: portfolioConfig.name,
            message: data.message,
        };

        try {
            await emailjs.send(
                emailjsConfig.serviceId, 
                emailjsConfig.templateId, 
                templateParams,
                { publicKey: emailjsConfig.publicKey }
            );
            setHistory(prev => [...prev, { command: '', output: 'Message sent successfully! ✉️' }]);
        } catch (error: any) {
            console.error('EmailJS error:', error);
            setHistory(prev => [...prev, { command: '', output: `Error: Failed to send message. ${error.text || 'Please try again later.'}` }]);
        } finally {
            setFormState({ step: 'idle', data: { name: '', email: '', message: '' } });
        }
    };
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        // Reset autocomplete state if user types something new
        setAutoCompleteSuggestions([]);
        setAutoCompleteIndex(0);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Tab') {
            e.preventDefault();
            let suggestions = autoCompleteSuggestions;

            // Generate suggestions if we don't have any yet for the current input
            if (suggestions.length === 0) {
                const currentInput = inputValue.toLowerCase().trim();
                if (currentInput) {
                    suggestions = Object.keys(COMMANDS).filter(cmd => 
                        cmd.startsWith(currentInput)
                    );
                    if (suggestions.length > 0) {
                        setAutoCompleteSuggestions(suggestions);
                    }
                }
            }
            
            // If we have suggestions, cycle through them
            if (suggestions.length > 0) {
                const nextSuggestion = suggestions[autoCompleteIndex % suggestions.length];
                setInputValue(nextSuggestion);
                setAutoCompleteIndex(prevIndex => prevIndex + 1);
            }
            return; // Exit early to avoid interference
        }

        // Reset autocomplete state on any other important key press
        setAutoCompleteSuggestions([]);
        setAutoCompleteIndex(0);
        
        if (e.key === 'Enter') {
            const currentInput = inputValue.trim();
            const fullInput = inputValue; // Keep original for history display
            setInputValue('');

            if (formState.step !== 'idle' && formState.step !== 'sending') {
                let newHistory: HistoryItem = { command: fullInput, output: '' };

                switch (formState.step) {
                    case 'name':
                        if (!currentInput) {
                             newHistory.output = 'Name cannot be empty. Please enter your name:';
                             setHistory(prev => [...prev, newHistory]);
                             return;
                        }
                        newHistory.output = 'Enter your email: ';
                        setHistory(prev => [...prev, newHistory]);
                        setFormState(prev => ({ step: 'email', data: { ...prev.data, name: currentInput } }));
                        break;
                    case 'email':
                        if (!/\S+@\S+\.\S+/.test(currentInput)) {
                            newHistory.output = 'Invalid email format. Please enter a valid email:';
                            setHistory(prev => [...prev, newHistory]);
                            return;
                        }
                        newHistory.output = 'Enter your message: ';
                        setHistory(prev => [...prev, newHistory]);
                        setFormState(prev => ({ step: 'message', data: { ...prev.data, email: currentInput } }));
                        break;
                    case 'message':
                         if (!currentInput) {
                             newHistory.output = 'Message cannot be empty. Please enter your message:';
                             setHistory(prev => [...prev, newHistory]);
                             return;
                        }
                        const finalData = { ...formState.data, message: currentInput };
                        newHistory.output = 'Sending message...';
                        setHistory(prev => [...prev, newHistory]);
                        setFormState(prev => ({ ...prev, step: 'sending', data: finalData }));
                        sendEmail(finalData);
                        break;
                }
            } else if (formState.step === 'idle') {
                if (currentInput === '') {
                    setHistory(prev => [...prev, { command: '', output: '' }]);
                    return;
                }

                if (currentInput) {
                    setCommandHistory(prev => [currentInput, ...prev]);
                    setHistoryIndex(-1);
                    trackCommand(currentInput);
                }
                
                if (currentInput.toLowerCase() === 'clear') {
                    setHistory([]);
                    return;
                }
                
                if (currentInput.toLowerCase() === 'message') {
                     setHistory(prev => [...prev, { command: 'message', output: 'Enter your name: ' }]);
                     setFormState({ step: 'name', data: { name: '', email: '', message: '' } });
                     return;
                }

                const newOutput = processCommand(currentInput, setTheme);
                setHistory(prev => [...prev, { command: currentInput, output: newOutput }]);
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (formState.step === 'idle' && historyIndex < commandHistory.length - 1) {
                const newIndex = historyIndex + 1;
                setHistoryIndex(newIndex);
                setInputValue(commandHistory[newIndex]);
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (formState.step === 'idle' && historyIndex > -1) {
                const newIndex = historyIndex - 1;
                setHistoryIndex(newIndex);
                setInputValue(newIndex === -1 ? '' : commandHistory[newIndex]);
            }
        } else if (e.ctrlKey && e.key === 'l') {
            e.preventDefault();
            setHistory([]);
        } else if (e.ctrlKey && e.key === 'c') {
            e.preventDefault();
            if (formState.step !== 'idle' && formState.step !== 'sending') {
                setHistory(prev => [...prev, { command: inputValue + '^C', output: 'Message cancelled.' }]);
                setFormState({ step: 'idle', data: { name: '', email: '', message: '' } });
                setInputValue('');
            } else {
                setInputValue('');
                setHistory(prev => [...prev, { command: inputValue, output: '' }]);
            }
        }
    };
    
    return {
        history,
        inputValue,
        theme,
        setTheme,
        formStep: formState.step,
        inputRef,
        terminalRef,
        handleInputChange,
        handleKeyDown,
        focusInput,
    };
};