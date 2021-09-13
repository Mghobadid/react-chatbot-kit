import React from 'react';

import Chat from '../Chat/Chat';

import ChatbotError from '../ChatbotError/ChatbotError';

import IConfig from '../../interfaces/IConfig';

import {
  getCustomStyles,
  getCustomComponents,
  getBotName,
  getCustomMessages,
} from './utils';

import useChatbot from '../../hooks/useChatbot';

interface IChatbotProps {
  actionProvider: any;
  messageParser: any;
  config: IConfig;
  headerText: string;
  placeholderText: string;
  saveMessages: (ref: any) => any;
  messageHistory: () => any;
  validator: (input: string) => Boolean;
}

const Chatbot = ({
  actionProvider,
  messageParser,
  config,
  headerText,
  placeholderText,
  saveMessages,
  messageHistory,
  validator,
  ...rest
}: IChatbotProps) => {
  const {
    configurationError,
    invalidPropsError,
    actionProv,
    messagePars,
    widgetRegistry,
    state,
    setState,
  } = useChatbot({
    config,
    actionProvider,
    messageParser,
    messageHistory,
    saveMessages,
    ...rest,
  });

  if (configurationError) {
    return <ChatbotError message={configurationError} />;
  }

  if (invalidPropsError.length) {
    return <ChatbotError message={invalidPropsError} />;
  }

  const customStyles = getCustomStyles(config);
  const customComponents = getCustomComponents(config);
  const botName = getBotName(config);
  const customMessages = getCustomMessages(config);

  return (
    <Chat
      state={state}
      setState={setState}
      widgetRegistry={widgetRegistry}
      actionProvider={actionProv}
      messageParser={messagePars}
      customMessages={customMessages}
      customComponents={{ ...customComponents }}
      botName={botName}
      customStyles={{ ...customStyles }}
      headerText={headerText}
      placeholderText={placeholderText}
      validator={validator}
    />
  );
};

export default Chatbot;