package praktikum.diplomski.controllers;


import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;

import praktikum.diplomski.models.ChatMessage;
import praktikum.diplomski.services.ChatMessageService;
import praktikum.diplomski.utils.View.HideOptionalProperties;

@CrossOrigin(origins={"http://localhost:4200"})
@RestController
@RequestMapping("/chatmessage")
public class ChatMessageController {

    @Autowired
    ChatMessageService chatMessageService;

    @JsonView(HideOptionalProperties.class)
    @RequestMapping()
    public ResponseEntity<Iterable<ChatMessage>> getChatMessages() {
        return new ResponseEntity<Iterable<ChatMessage>>(chatMessageService.getChatMessages(), HttpStatus.OK);
    }
    
    @JsonView(HideOptionalProperties.class)
    @RequestMapping(value="/user/{username}", method=RequestMethod.GET)
    public ResponseEntity<Iterable<ChatMessage>> getChatMessagesByUser(@PathVariable String username) {
        return new ResponseEntity<Iterable<ChatMessage>>(chatMessageService.getChatMessagesByUser(username), HttpStatus.OK);
    }

    @JsonView(HideOptionalProperties.class)
    @RequestMapping(value="/{id}", method=RequestMethod.GET)
    public ResponseEntity<ChatMessage> getChatMessageById(@PathVariable Long id) {
        Optional<ChatMessage> chatMessage = chatMessageService.getChatMessageById(id);
        if(chatMessage.isPresent()) {
            return new ResponseEntity<ChatMessage>(chatMessage.get(), HttpStatus.OK);
        }
        return new ResponseEntity<ChatMessage>(HttpStatus.NOT_FOUND);
    }

    @RequestMapping(value="", method=RequestMethod.POST)
    public ResponseEntity<ChatMessage> addChatMessage(@RequestBody ChatMessage ChatMessages) {
        chatMessageService.addChatMessage(ChatMessages);
        return new ResponseEntity<ChatMessage>(ChatMessages, HttpStatus.CREATED);
    }

    @RequestMapping(value="/{id}", method=RequestMethod.PUT)
    public ResponseEntity<ChatMessage> updateChatMessage(@PathVariable Long id, @RequestBody ChatMessage ChatMessages) {
        chatMessageService.updateChatMessage(id, ChatMessages);
        return new ResponseEntity<ChatMessage>(ChatMessages, HttpStatus.CREATED);
    }

    @RequestMapping(value="/{id}", method=RequestMethod.DELETE)
    public ResponseEntity<ChatMessage> removeChatMessage(@PathVariable Long id) {
        try {
            chatMessageService.removeChatMessage(id);
        }catch (Exception e) {
            return new ResponseEntity<ChatMessage>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<ChatMessage>(HttpStatus.NO_CONTENT);
    }

}
