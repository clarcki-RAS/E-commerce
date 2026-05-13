package com.project.vente.service;

import java.util.List;

import com.project.vente.model.Clothes;

public interface ClothesService {
	
	public Clothes saveClothes(Clothes clothes); 
	public List<Clothes> fetchClothes();
	public List<Clothes> findByUser(Long userId);
	public Clothes updateClothes(Clothes clothes);
	public void deleteClothes(Clothes clothes);
	
	public List<Clothes> getClothesWithoutUser(Long userId);
}
