package com.project.vente.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.vente.model.Clothes;
import com.project.vente.repository.ClothesRepository;

@Service
public class ClothesServiceImpl implements ClothesService {

	@Autowired
	private ClothesRepository clothesRepository;
	
	@Override
	public Clothes saveClothes(Clothes clothes) {
		return clothesRepository.save(clothes);
	}

	@Override
	public List<Clothes> fetchClothes() {
		
		return clothesRepository.findAll();
	}

	@Override
	public List<Clothes> findByUser(Long userId) {
		
		return clothesRepository.findByUserId(userId);
	}

	@Override
	@Transactional
	public Clothes updateClothes(Clothes clothes) {
		
		return clothesRepository.save(clothes);
	}

	@Override
	public void deleteClothes(Clothes clothes) {
		
		clothesRepository.delete(clothes);
	}

	@Override
	public List<Clothes> getClothesWithoutUser(Long userId) {
		
		return clothesRepository.findByUserIsNotEqual(userId);
	}
}
