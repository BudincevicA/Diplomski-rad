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

import praktikum.diplomski.models.UserScore;
import praktikum.diplomski.services.UserScoreService;
import praktikum.diplomski.utils.View.HideOptionalProperties;

@CrossOrigin(origins={"http://localhost:4200"})
@RestController
@RequestMapping("/userScore")
public class UserScoreController {

    @Autowired
    UserScoreService userScoreService;

    @JsonView(HideOptionalProperties.class)
    @RequestMapping()
    public ResponseEntity<Iterable<UserScore>> getUserScores() {
        return new ResponseEntity<Iterable<UserScore>>(userScoreService.getUserScores(), HttpStatus.OK);
    }

    @JsonView(HideOptionalProperties.class)
    @RequestMapping(value="/{id}", method=RequestMethod.GET)
    public ResponseEntity<UserScore> getUserScoreById(@PathVariable Long id) {
        Optional<UserScore> userScore = userScoreService.getUserScoreById(id);
        if(userScore.isPresent()) {
            return new ResponseEntity<UserScore>(userScore.get(), HttpStatus.OK);
        }
        return new ResponseEntity<UserScore>(HttpStatus.NOT_FOUND);
    }

    @RequestMapping(value="/register", method=RequestMethod.POST)
    public ResponseEntity<UserScore> addUserScore(@RequestBody UserScore UserScore) { 
    	userScoreService.addUserScore(UserScore);
        return new ResponseEntity<UserScore>(UserScore, HttpStatus.CREATED);
    }

    @RequestMapping(value="/{id}", method=RequestMethod.PUT)
    public ResponseEntity<UserScore> updateUserScore(@PathVariable Long id, @RequestBody UserScore UserScore) {
        userScoreService.updateUserScore(id, UserScore);
        return new ResponseEntity<UserScore>(UserScore, HttpStatus.CREATED);
    }

    @RequestMapping(value="/{id}", method=RequestMethod.DELETE)
    public ResponseEntity<UserScore> removeUserScore(@PathVariable Long id) {
        try {
            userScoreService.removeUserScore(id);
        }catch (Exception e) {
            return new ResponseEntity<UserScore>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<UserScore>(HttpStatus.NO_CONTENT);
    }
	
	
}