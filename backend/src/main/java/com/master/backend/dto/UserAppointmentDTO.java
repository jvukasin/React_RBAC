package com.master.backend.dto;

public class UserAppointmentDTO {

    private long id;
    private String person;
    private String date;
    private String time;
    private String note;

    public UserAppointmentDTO() {
    }

    public UserAppointmentDTO(long id, String person, String date, String time, String note) {
        this.id = id;
        this.person = person;
        this.date = date;
        this.time = time;
        this.note = note;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getPerson() {
        return person;
    }

    public void setPerson(String person) {
        this.person = person;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

}
