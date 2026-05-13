package com.project.vente.request;

public class CartChart {
	
	private Double sum;
	private Double max;
	private Double min;
	
	public CartChart(Double sum, Double max, Double min) {
		this.sum = sum;
		this.max = max;
		this.min = min;
	}
	public Double getSum() {
		return sum;
	}
	public void setSum(Double sum) {
		this.sum = sum;
	}
	public Double getMax() {
		return max;
	}
	public void setMax(Double max) {
		this.max = max;
	}
	public Double getMin() {
		return min;
	}
	public void setMin(Double min) {
		this.min = min;
	}
	
}
