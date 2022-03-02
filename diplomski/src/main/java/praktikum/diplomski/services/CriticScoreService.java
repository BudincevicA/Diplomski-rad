package praktikum.diplomski.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import praktikum.diplomski.models.CriticScore;
import praktikum.diplomski.repositories.CriticScoreRepository;

@Service
public class CriticScoreService {

    @Autowired
    private CriticScoreRepository criticScoreRepo;


    public CriticScoreService() {
    }

    public Iterable<CriticScore> getCriticScores() {
        return criticScoreRepo.findAll();
    }

    public Optional<CriticScore> getCriticScoreById(Long id) {
        return criticScoreRepo.findById(id);
    }

    public void addCriticScore(CriticScore criticScore) {
    	criticScoreRepo.save(criticScore);
    }

    public void removeCriticScore(Long id) {
        Optional<CriticScore> criticScore = criticScoreRepo.findById(id);
        criticScoreRepo.delete(criticScore.get());
    }

    public void updateCriticScore(Long id, CriticScore criticScore) {
        Optional<CriticScore> Rev = criticScoreRepo.findById(id);
        if(Rev.isPresent()) {
        	criticScore.setId(Rev.get().getId());
        	criticScoreRepo.save(criticScore);
        }
    }
	
	
}
