package com.specialist.exam.airline.service.dto;

public class ReservationsStatsDTO {
    private String today2;
    private String today1;
    private String month2;
    private String month1;
    private String year2;
    private String year1;

    public ReservationsStatsDTO(String today2, String today1, String month2, String month1, String year2, String year1) {
        this.today2 = today2;
        this.today1 = today1;
        this.month2 = month2;
        this.month1 = month1;
        this.year2 = year2;
        this.year1 = year1;
    }

    public String getToday2() {
        return today2;
    }

    public void setToday2(String today2) {
        this.today2 = today2;
    }

    public String getToday1() {
        return today1;
    }

    public void setToday1(String today1) {
        this.today1 = today1;
    }

    public String getMonth2() {
        return month2;
    }

    public void setMonth2(String month2) {
        this.month2 = month2;
    }

    public String getMonth1() {
        return month1;
    }

    public void setMonth1(String month1) {
        this.month1 = month1;
    }

    public String getYear2() {
        return year2;
    }

    public void setYear2(String year2) {
        this.year2 = year2;
    }

    public String getYear1() {
        return year1;
    }

    public void setYear1(String year1) {
        this.year1 = year1;
    }
}
