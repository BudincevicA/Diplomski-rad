package praktikum.diplomski.repositories;


import java.util.ArrayList;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import praktikum.diplomski.models.CriticScore;

@Repository
public interface CriticScoreRepository extends JpaRepository<CriticScore, Long>{
	ArrayList<CriticScore> findCriticScoresByFilmId(Long filmId);
}
