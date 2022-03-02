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

import praktikum.diplomski.models.CriticScore;
import praktikum.diplomski.services.CriticScoreService;
import praktikum.diplomski.utils.View.HideOptionalProperties;

@CrossOrigin(origins={"http://localhost:4200"})
@RestController
@RequestMapping("/criticScore")
public class CriticScoreController {

    @Autowired
    CriticScoreService criticScoreService;

    @JsonView(HideOptionalProperties.class)
    @RequestMapping()
    public ResponseEntity<Iterable<CriticScore>> getCriticScores() {
        return new ResponseEntity<Iterable<CriticScore>>(criticScoreService.getCriticScores(), HttpStatus.OK);
    }

    @JsonView(HideOptionalProperties.class)
    @RequestMapping(value="/{id}", method=RequestMethod.GET)
    public ResponseEntity<CriticScore> getCriticScoreById(@PathVariable Long id) {
        Optional<CriticScore> criticScore = criticScoreService.getCriticScoreById(id);
        if(criticScore.isPresent()) {
            return new ResponseEntity<CriticScore>(criticScore.get(), HttpStatus.OK);
        }
        return new ResponseEntity<CriticScore>(HttpStatus.NOT_FOUND);
    }

    @RequestMapping(value="/register", method=RequestMethod.POST)
    public ResponseEntity<CriticScore> addCriticScore(@RequestBody CriticScore CriticScore) { 
    	criticScoreService.addCriticScore(CriticScore);
        return new ResponseEntity<CriticScore>(CriticScore, HttpStatus.CREATED);
    }

    @RequestMapping(value="/{id}", method=RequestMethod.PUT)
    public ResponseEntity<CriticScore> updateCriticScore(@PathVariable Long id, @RequestBody CriticScore CriticScore) {
        criticScoreService.updateCriticScore(id, CriticScore);
        return new ResponseEntity<CriticScore>(CriticScore, HttpStatus.CREATED);
    }

    @RequestMapping(value="/{id}", method=RequestMethod.DELETE)
    public ResponseEntity<CriticScore> removeCriticScore(@PathVariable Long id) {
        try {
            criticScoreService.removeCriticScore(id);
        }catch (Exception e) {
            return new ResponseEntity<CriticScore>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<CriticScore>(HttpStatus.NO_CONTENT);
    }
	
	
}