//cap quyen thu muc npm
sudo chown -R $(whoami) $(npm config get prefix)/{lib/node_modules,bin,share}
npm install -g generator-jhipster
    npm install -g generator-jhipster@7.1.0     //redux bt, <>redux toolkit
    package.json
    webpack-cli: 4.9.1
    workbox-webpack-plugin: 
    npm install --save-exact history@4.10.1
mkdir myApp && cd myApp
jhipster
jhipster --version
8.4.0
https://www.jhipster.tech/
domain: modal
webapp: react->web/rest: controller->service->repository->db

./mvnw
npm run e2e         *** hay

jhipster heroku

jhipster jdl ./jdl/sql.jdl --ignore-application
jhipster jdl ./readme/sql.jdl

ynarxdeiH
y) overwrite
n) do not overwrite
a) overwrite this and all others
r) reload file (experimental)
x) abort
d) show the differences between the old and the new
e) edit file (experimental)
i) ignore, do not overwrite and remember (experimental)
h) Help, list all options

nếu sửa jdl xong mà k chạy được thì xóa database trong mysql đi
vì liquidbase nó k thể thay đổi table đã tạo

https://devforum.okta.com/t/build-a-photo-gallery-pwa-with-react-spring-boot-and-jhipster/16888

url: jdbc:mysql://localhost:3306/jhSeaPort2?useUnicode=true&characterEncoding=utf8&useSSL=false&useLegacyDatetimeCode=false&createDatabaseIfNotExist=true&allowPublicKeyRetrieval=true
username: root
password: 1111


  ${AnsiColor.GREEN}████████╗${AnsiColor.CYAN} ██╗   ██╗ █████╗ ███╗   ██╗    ███╗   ███╗████████╗ █████╗ 
  ${AnsiColor.GREEN}╚══██╔══╝${AnsiColor.CYAN} ██║   ██║██╔══██╗████╗  ██║    ████╗ ████║╚══██╔══╝██╔══██╗
  ${AnsiColor.GREEN}   ██║   ${AnsiColor.CYAN} ██║   ██║███████║██╔██╗ ██║    ██╔████╔██║   ██║   ███████║
  ${AnsiColor.GREEN}   ██║   ${AnsiColor.CYAN} ██║   ██║██╔══██║██║╚██╗██║    ██║╚██╔╝██║   ██║   ██╔══██║
  ${AnsiColor.GREEN}   ██║   ${AnsiColor.CYAN} ╚██████╔╝██║  ██║██║ ╚████║    ██║ ╚═╝ ██║   ██║   ██║  ██║
  ${AnsiColor.GREEN}   ╚═╝   ${AnsiColor.CYAN}  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═══╝    ╚═╝     ╚═╝   ╚═╝   ╚═╝  ╚═╝

${AnsiColor.BRIGHT_BLUE}:: JHipster 🤓  :: Running Spring Boot ${spring-boot.version} :: Startup profile(s) ${spring.profiles.active} ::

__/\\\\\\\\\\\\\\\__/\\\________/\\\_____/\\\\\\\\\_____/\\\\\_____/\\\____________/\\\\____________/\\\\__/\\\\\\\\\\\\\\\_____/\\\\\\\\\____        
 _\///////\\\/////__\/\\\_______\/\\\___/\\\\\\\\\\\\\__\/\\\\\\___\/\\\___________\/\\\\\\________/\\\\\\_\///////\\\/////____/\\\\\\\\\\\\\__       
  _______\/\\\_______\/\\\_______\/\\\__/\\\/////////\\\_\/\\\/\\\__\/\\\___________\/\\\//\\\____/\\\//\\\_______\/\\\________/\\\/////////\\\_      
   _______\/\\\_______\/\\\_______\/\\\_\/\\\_______\/\\\_\/\\\//\\\_\/\\\___________\/\\\\///\\\/\\\/_\/\\\_______\/\\\_______\/\\\_______\/\\\_     
    _______\/\\\_______\/\\\_______\/\\\_\/\\\\\\\\\\\\\\\_\/\\\\//\\\\/\\\___________\/\\\__\///\\\/___\/\\\_______\/\\\_______\/\\\\\\\\\\\\\\\_    
     _______\/\\\_______\/\\\_______\/\\\_\/\\\/////////\\\_\/\\\_\//\\\/\\\___________\/\\\____\///_____\/\\\_______\/\\\_______\/\\\/////////\\\_   
      _______\/\\\_______\//\\\______/\\\__\/\\\_______\/\\\_\/\\\__\//\\\\\\___________\/\\\_____________\/\\\_______\/\\\_______\/\\\_______\/\\\_  
       _______\/\\\________\///\\\\\\\\\/___\/\\\_______\/\\\_\/\\\___\//\\\\\___________\/\\\_____________\/\\\_______\/\\\_______\/\\\_______\/\\\_ 
        _______\///___________\/////////_____\///________\///__\///_____\/////____________\///______________\///________\///________\///________\///__


yarn add react-slick slick-carousel
>app.scss
@import "~slick-carousel/slick/slick.css";
@import "~slick-carousel/slick/slick-theme.css";

.jh-navbar {
  background-color: rgb(153, 0, 0);

# Thiết lập JAVA_HOME cho Java 21
export JAVA_HOME=$(/usr/libexec/java_home -v 21)
export PATH=$JAVA_HOME/bin:$PATH

source ~/.zshrc

./mvnw

Trong IntelliJ IDEA, bạn có thể thực hiện các bước tương tự để chạy ứng dụng JHipster của mình mà không gặp lỗi datasource. Dưới đây là hướng dẫn chi tiết:

  1. Chạy với Spring Profile
  Để chạy ứng dụng với một Spring profile cụ thể trong IntelliJ IDEA:

  Mở phần cấu hình chạy (Run Configuration) bằng cách nhấp vào Run trên thanh menu và chọn Edit Configurations....
  Tạo một cấu hình chạy mới hoặc chỉnh sửa cấu hình hiện tại của bạn.
  Trong phần VM options, thêm -Dspring.profiles.active=dev để thiết lập profile. Ví dụ:
  plaintext
  Copy code
  -Dspring.profiles.active=dev
  2. Thiết lập biến môi trường
  Bạn cũng có thể thiết lập các biến môi trường cần thiết:

  Trong phần cấu hình chạy, tìm và nhấp vào tab Configuration.
  Trong phần Environment variables, thêm các biến môi trường như SPRING_DATASOURCE_URL, SPRING_DATASOURCE_USERNAME, và SPRING_DATASOURCE_PASSWORD.
  3. Đảm bảo Classpath đúng
  IntelliJ IDEA thường sẽ tự động thiết lập classpath đúng nếu bạn đã import dự án Maven hoặc Gradle. Đảm bảo rằng bạn đã import dự án như một dự án Maven bằng cách:

  Nhấp chuột phải vào file pom.xml và chọn Add as Maven Project.
  Chờ IDEA tải và cấu hình các dependency.
  4. Build dự án
  Đảm bảo rằng dự án của bạn đã được build trước khi chạy:

  Nhấp vào Build trên thanh menu và chọn Build Project hoặc Rebuild Project.
  5. Chạy ứng dụng
  Sau khi thiết lập tất cả các cấu hình trên, bạn có thể chạy ứng dụng bằng cách nhấp vào nút Run (hình tam giác màu xanh) trên thanh công cụ hoặc sử dụng phím tắt Shift + F10.

  Tóm tắt các bước cụ thể
  Mở Run Configuration:

  Run > Edit Configurations...
  Thiết lập Spring Profile:

  Trong tab Configuration, thêm -Dspring.profiles.active=dev vào VM options.
  Thiết lập biến môi trường:

  Trong tab Configuration, thêm biến môi trường cần thiết vào Environment variables.
  Import dự án Maven:

  Nhấp chuột phải vào pom.xml > Add as Maven Project.
  Build dự án:

  Build > Build Project hoặc Rebuild Project.
  Chạy ứng dụng:

  Nhấp vào nút Run hoặc sử dụng phím tắt Shift + F10.
  Với các bước này, bạn sẽ đảm bảo rằng ứng dụng của bạn có đầy đủ các cấu hình và dependency cần thiết để chạy mà không gặp lỗi datasource.


Mở IntelliJ IDEA và vào File -> Project Structure.
Ở phần Project (hoặc Modules nếu bạn đang làm việc với một module cụ thể), chọn Project SDK là JDK 20 (hoặc phiên bản Java 20 mà bạn đã cài đặt).

pom.xml
<properties>
    <maven.compiler.source>20</maven.compiler.source>
    <maven.compiler.target>20</maven.compiler.target>
</properties>


-thêm comment với tài khoản
-trang cá nhân
-liên kết post khi bấm vào tiêu đề
-liên kết trang cá nhân khi bấm vào name
-liên kết create post ở trang cá nhân
-liên kết edit profile ở trang cá nhân
-trang bài viết
-chỉ hiện bài viết success
-1 liên kết person và user ok
-2 nhận dạng person
-trang phân quyền 
-trang duyệt bài của admin


<plugin>
  <groupId>com.github.eirslett</groupId>
  <artifactId>frontend-maven-plugin</artifactId>
  <executions>
      <execution>
          <id>install-node-and-npm</id>
          <goals>
              <goal>install-node-and-npm</goal>
          </goals>
          <configuration>
              <skip>true</skip> <!-- Thêm dòng này để bỏ qua -->
          </configuration>
      </execution>
      <execution>
          <id>npm install</id>
          <goals>
              <goal>npm</goal>
          </goals>
          <configuration>
              <skip>true</skip> <!-- Thêm dòng này để bỏ qua -->
          </configuration>
      </execution>
      <execution>
          <id>webapp build test</id>
          <goals>
              <goal>npm</goal>
          </goals>
          <phase>test</phase>
          <configuration>
              <arguments>run webapp:test</arguments>
              <npmInheritsProxyConfigFromMaven>false</npmInheritsProxyConfigFromMaven>
              <skip>true</skip> <!-- Thêm dòng này để bỏ qua -->
          </configuration>
      </execution>
      <execution>
          <id>webapp build prod</id>
          <goals>
              <goal>npm</goal>
          </goals>
          <phase>generate-resources</phase>
          <configuration>
              <arguments>run webapp:prod</arguments>
              <environmentVariables>
                  <APP_VERSION>${project.version}</APP_VERSION>
              </environmentVariables>
              <npmInheritsProxyConfigFromMaven>false</npmInheritsProxyConfigFromMaven>
              <skip>true</skip> <!-- Thêm dòng này để bỏ qua -->
          </configuration>
      </execution>
  </executions>
</plugin>

websocket

<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-websocket</artifactId>
</dependency>

./mvnw clean install
yarn add @stomp/stompjs sockjs-client

application.yml
    kafka:
        client:
        dns:
            lookup: use_dns_cache
        bootstrap-servers: ${KAFKA_BROKER_SERVER:localhost}:${KAFKA_BROKER_PORT:9092}
        producer:
        value-serializer: org.springframework.kafka.support.serializer.JsonSerializer
        #transaction-id-prefix: tx.
        properties:
            "[spring.json.type.mapping]": category:com.mycompany.myapp.domain.Category
        consumer:
        value-deserializer: org.apache.kafka.common.serialization.ByteArrayDeserializer
pom.yml
    <dependency>
			<groupId>org.springframework.kafka</groupId>
			<artifactId>spring-kafka</artifactId>
	</dependency>


////////////////////////////////////
nodejs

Cài đặt nvm:
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash 
Thêm nvm vào file cấu hình shell:
    Nếu bạn dùng zsh, thêm vào ~/.zshrc:
        export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
        [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
    Nếu bạn dùng bash, thêm vào ~/.bashrc hoặc ~/.bash_profile:
        export NVM_DIR="$HOME/.nvm"
        [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
Tải lại file cấu hình shell:
    source ~/.zshrc  # hoặc source ~/.bashrc / ~/.bash_profile tùy theo shell bạn dùng
Cài đặt phiên bản Node.js mong muốn:
    nvm install node  # Cài đặt phiên bản mới nhất
    nvm install 20    # Cài đặt phiên bản 20
Kiểm tra phiên bản Node.js:
    node -v
Với nvm, bạn có thể dễ dàng chuyển đổi giữa các phiên bản Node.js bằng lệnh nvm use <version>.

jhipster docker-compose
Welcome to the JHipster Docker Compose Sub-Generator 🐳

trong jhipster java react, tôi có file personresource.java:
@RestController
@RequestMapping("/api")
public class PersonResource {

    private final PersonRepository personRepository;

    public PersonResource(PersonRepository personRepository) {
        this.personRepository = personRepository;
    }

    @GetMapping("/person-by-user/{userId}")
    public ResponseEntity<Person> getPersonByUserId(@PathVariable Long userId) {
        Optional<Person> person = personRepository.findOneByUserId(userId);
        return person.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
}
và file personrepository:
public interface PersonRepository extends JpaRepository<Person, Long> {

    Optional<Person> findOneByUserId(Long userId);
}
đấy là file person.reducer.ts:
import axios from 'axios';
import { createAsyncThunk, isFulfilled, isPending } from '@reduxjs/toolkit';
import { ASC } from 'app/shared/util/pagination.constants';
import { cleanEntity } from 'app/shared/util/entity-utils';
import { IQueryParams, createEntitySlice, EntityState, serializeAxiosError } from 'app/shared/reducers/reducer.utils';
import { IPerson, defaultValue } from 'app/shared/model/person.model';

const initialState: EntityState<IPerson> = {
  loading: false,
  errorMessage: null,
  entities: [],
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

const apiUrl = 'api/people';

// Actions

export const getEntities = createAsyncThunk(
  'person/fetch_entity_list',
  async ({ sort }: IQueryParams) => {
    const requestUrl = `${apiUrl}?${sort ? `sort=${sort}&` : ''}cacheBuster=${new Date().getTime()}`;
    return axios.get<IPerson[]>(requestUrl);
  },
  { serializeError: serializeAxiosError },
);

export const getEntity = createAsyncThunk(
  'person/fetch_entity',
  async (id: string | number) => {
    const requestUrl = `${apiUrl}/${id}`;
    return axios.get<IPerson>(requestUrl);
  },
  { serializeError: serializeAxiosError },
);

export const createEntity = createAsyncThunk(
  'person/create_entity',
  async (entity: IPerson, thunkAPI) => {
    const result = await axios.post<IPerson>(apiUrl, cleanEntity(entity));
    thunkAPI.dispatch(getEntities({}));
    return result;
  },
  { serializeError: serializeAxiosError },
);

export const updateEntity = createAsyncThunk(
  'person/update_entity',
  async (entity: IPerson, thunkAPI) => {
    const result = await axios.put<IPerson>(`${apiUrl}/${entity.id}`, cleanEntity(entity));
    thunkAPI.dispatch(getEntities({}));
    return result;
  },
  { serializeError: serializeAxiosError },
);

export const partialUpdateEntity = createAsyncThunk(
  'person/partial_update_entity',
  async (entity: IPerson, thunkAPI) => {
    const result = await axios.patch<IPerson>(`${apiUrl}/${entity.id}`, cleanEntity(entity));
    thunkAPI.dispatch(getEntities({}));
    return result;
  },
  { serializeError: serializeAxiosError },
);

export const deleteEntity = createAsyncThunk(
  'person/delete_entity',
  async (id: string | number, thunkAPI) => {
    const requestUrl = `${apiUrl}/${id}`;
    const result = await axios.delete<IPerson>(requestUrl);
    thunkAPI.dispatch(getEntities({}));
    return result;
  },
  { serializeError: serializeAxiosError },
);

// slice

export const PersonSlice = createEntitySlice({
  name: 'person',
  initialState,
  extraReducers(builder) {
    builder
      .addCase(getEntity.fulfilled, (state, action) => {
        state.loading = false;
        state.entity = action.payload.data;
      })
      .addCase(deleteEntity.fulfilled, state => {
        state.updating = false;
        state.updateSuccess = true;
        state.entity = {};
      })
      .addMatcher(isFulfilled(getEntities), (state, action) => {
        const { data } = action.payload;

        return {
          ...state,
          loading: false,
          entities: data.sort((a, b) => {
            if (!action.meta?.arg?.sort) {
              return 1;
            }
            const order = action.meta.arg.sort.split(',')[1];
            const predicate = action.meta.arg.sort.split(',')[0];
            return order === ASC ? (a[predicate] < b[predicate] ? -1 : 1) : b[predicate] < a[predicate] ? -1 : 1;
          }),
        };
      })
      .addMatcher(isFulfilled(createEntity, updateEntity, partialUpdateEntity), (state, action) => {
        state.updating = false;
        state.loading = false;
        state.updateSuccess = true;
        state.entity = action.payload.data;
      })
      .addMatcher(isPending(getEntities, getEntity), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.loading = true;
      })
      .addMatcher(isPending(createEntity, updateEntity, partialUpdateEntity, deleteEntity), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.updating = true;
      });
  },
});

export const { reset } = PersonSlice.actions;

// Reducer
export default PersonSlice.reducer;
làm sao để tôi có thể từ fronten gọi api này và lưu trữ thông tin Person vào Redux store.