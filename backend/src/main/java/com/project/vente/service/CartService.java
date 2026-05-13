package com.project.vente.service;

import java.util.Date;
import java.util.List;
import java.util.Map;

import com.project.vente.model.Cart;
import com.project.vente.request.CartChart;

public interface CartService {
	
	public Cart saveCart(Cart cart);
	public Map<Date, List<Cart>> getCartsByDayandDate(Long buyerId, Date date);
	public Map<Date, Map<Double, List<Cart>>> getCartsByDay(Long buyerId);
//	public Map<Date, Map<Double, List<Cart>>> getCartsByDayandDate(Long buyerId, Date date);
	public CartChart getChartData(Long buyerId);
}
