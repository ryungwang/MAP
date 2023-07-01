package com.map.app.entity.user;

import com.map.app.main.user.dto.UserDto;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.util.Date;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
@ToString
@Table(name = "M_USER")
public class UserEntity {

    @Builder
    public UserEntity(UserDto dto) {
        this.userNo = dto.getUserNo();
        this.userId = dto.getUserEmail();
        this.userPassword = dto.getUserPassword();
        this.userEmail = dto.getUserEmail();
        this.userEmailDomain = dto.getUserEmailDomain();
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "USER_NO")
    private Long userNo;

    @Column(name = "USER_ID", length = 20, nullable = false)
    private String userId;

    @Column(name = "USER_PASSWORD", length = 100, nullable = false)
    private String userPassword;

    @Column(name = "USER_EMAIL", length = 20, nullable = false)
    private String userEmail;

    @Column(name = "USER_EMAIL_DOMAIN", length = 20, nullable = false)
    private String userEmailDomain;

    @Column(name = "REG_DATE", updatable = false)
    @CreationTimestamp
    private Date regDate;

    @Column(name = "MOD_DATE", insertable = false)
    @UpdateTimestamp
    private Date modDate;
}
