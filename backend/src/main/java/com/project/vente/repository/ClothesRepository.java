package com.project.vente.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.project.vente.model.Clothes;

@Repository
public interface ClothesRepository extends JpaRepository<Clothes, Long> {
	
	@Query("SELECT c FROM Clothes c WHERE c.user.id = ?1 AND c.quantity != 0")
	List<Clothes> findByUserId(Long userId);
	
	@Query("SELECT c FROM Clothes c WHERE c.user.id != ?1 AND c.quantity != 0")
	List<Clothes> findByUserIsNotEqual(Long userId);
}
