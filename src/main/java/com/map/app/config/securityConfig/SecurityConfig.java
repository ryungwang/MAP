package com.map.app.config.securityConfig;

import com.map.app.entity.user.UserEntity;
import com.map.app.main.user.dto.UserDto;
import com.map.app.main.user.repository.UserRepository;
import com.map.app.main.user.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
@AllArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private UserService userService;

    private UserRepository userRepository;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    public void configure(WebSecurity web) {
        // static 디렉터리의 하위 파일 목록은 인증 무시 ( = 항상통과 )
        web.ignoring().antMatchers("/css/**", "/js/**", "/img/**", "/lib/**");
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
//                .antMatchers("/").permitAll()
                /** 페이지 권한 설정 */
                /** /admin 으로 시작하는 경로는 ADMIN 롤을 가진 사용자만 접근 */
                .antMatchers("/admin/**").hasRole("ADMIN")
                /** /user 경로는 MEMBER 롤을 가진 사용자만 접근 */
                .antMatchers("/user/**").hasRole("MEMBER")
                /** 모든 경로에 대해서는 권한없이 접근 가능 */
//                .antMatchers("/**").permitAll()
                /** 모든 요청에 대해, 인증된 사용자만 접근하도록 설정 */
                .anyRequest().authenticated()

                .and()

                /** form 기반 로그인 설정 */
                .formLogin()
                /** 로그인 form에서 아이디는 name=username인 input을 기본으로 인식하는데, usernameParameter() 메서드를 통해 파라미터명을 변경 */
//                .usernameParameter("파라미터명")
                /** 커스텀 로그인 폼을 사용 */
//                .loginPage("/login/login")

                /** 로그인이 성공했을 때 이동되는 페이지 */
                .defaultSuccessUrl("/loginSuccess")
                .permitAll()


                .and()

                /** 로그아웃 설정 */
                .logout()
                /** 로그아웃의 기본 URL(/logout) 이 아닌 다른 URL로 재정의 */
//                .logoutRequestMatcher(new AntPathRequestMatcher("/user/logOut"))
                /** 로그아웃의 성공 URL */
                .logoutSuccessUrl("/login/logOutSuccess")
                .invalidateHttpSession(true)
                /** 로그아웃 시, 특정 쿠기를 제거 */
//                .deleteCookies("키명")

                .and()
                /** 403 예외처리 핸들링 */
                .exceptionHandling().accessDeniedPage("/common/accessDenied");
    }

    @Override
    public void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.inMemoryAuthentication().withUser("deer").password(passwordEncoder().encode("fbsrhkd1!")).roles("ADMIN");
        auth.userDetailsService(userService).passwordEncoder(passwordEncoder());
    }

}
