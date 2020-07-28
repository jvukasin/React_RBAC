package com.master.backend.service;

import com.master.backend.dto.TempDTO;
import com.master.backend.model.Temp;
import com.master.backend.repository.TempRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TempService {

    @Autowired
    TempRepository tempRepository;

    public List<TempDTO> findAll() {
        List<Temp> ttt = tempRepository.findAll();
        List<TempDTO> ret = new ArrayList<>();
        for (Temp t : ttt) {
            TempDTO dto = new TempDTO(t);
            ret.add(dto);
        }
        return ret;
    }

}
