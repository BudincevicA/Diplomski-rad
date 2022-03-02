package praktikum.diplomski.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

import praktikum.diplomski.models.ChatMessage;
import praktikum.diplomski.services.ChatMessageService;



@Controller
@CrossOrigin("http://localhost:4200")
public class ChatController {
	
	@Autowired
	ChatMessageService chatMessageService;
	
	@MessageMapping("/ws")
	@SendTo("/topic/ws")
	public ChatMessage poruka(@Payload ChatMessage receivedMessage) {
		chatMessageService.addChatMessage(receivedMessage);
		return receivedMessage;
	}

}
