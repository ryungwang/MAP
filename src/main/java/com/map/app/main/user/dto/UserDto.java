package com.map.app.main.user.dto;

import com.map.app.entity.user.UserEntity;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class UserDto {

    private Long userNo;
    private String userId;
    private String userPassword;
    private String userEmail;
    private String userEmailDomain;
    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;

    public UserEntity toEntity(){
        UserDto dto = new UserDto();
        dto.setUserId(userId);
        dto.setUserPassword(userPassword);
        dto.setUserEmail(userEmail);
        dto.setUserEmailDomain(userEmailDomain);

        return UserEntity.builder()
                .dto(dto)
                .build();
    }

    @Builder
    public UserDto(UserDto dto) {
        this.userNo = dto.getUserNo();
        this.userId = dto.getUserEmail();
        this.userPassword = dto.getUserPassword();
        this.userEmail = dto.getUserEmail();
        this.userEmailDomain = dto.getUserEmailDomain();
    }
}
