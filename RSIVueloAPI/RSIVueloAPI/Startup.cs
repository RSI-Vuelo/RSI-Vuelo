using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Driver;
using RSIVueloAPI.Helpers;
using RSIVueloAPI.Models;
using RSIVueloAPI.Services;
using Swashbuckle.AspNetCore.Swagger;
using System;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace RSIVueloAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors();

            // configure strongly typed settings objects
            var appSettingsSection = Configuration.GetSection("AppSettings");
            services.Configure<AppSettings>(appSettingsSection);

            // configure jwt authentication
            var appSettings = appSettingsSection.Get<AppSettings>();
            var key = Encoding.ASCII.GetBytes(appSettings.Secret);
            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(x =>
            {
                x.Events = new JwtBearerEvents
                {
                    OnTokenValidated = context =>
                    {
                        var userService = context.HttpContext.RequestServices.GetRequiredService<IUserService>();
                        var userId = context.Principal.Identity.Name; // should be string
                        var user = userService.Get(userId);
                        if (user == null)
                            context.Fail("Unauthorized"); // return unauthorized if user no longer exists

                        return Task.CompletedTask;
                    }
                };
            x.RequireHttpsMetadata = false;
            x.SaveToken = true;
            x.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = false,
                ValidateAudience = false
            };
                });

            // cookie auth
            //services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
            //    .AddCookie(options =>
            //    {
            //        // disable automatic challenge (always redirect user when on page)
            //        options.Events.OnRedirectToLogin = (context) =>
            //        {
            //            context.Response.StatusCode = 401;
            //            return Task.CompletedTask;
            //        };

            //        // cookie settings
            //        options.Cookie.HttpOnly = true;
            //        options.Cookie.SameSite = SameSiteMode.Strict;
            //        options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
            //        options.Cookie.Name = "CookieAuthentication";
            //        options.LoginPath = "/login";
            //        options.AccessDeniedPath = "/Forbidden";
            //        options.Cookie.Expiration = TimeSpan.FromDays(10);
            //        options.ExpireTimeSpan = TimeSpan.FromDays(10);
            //    });
            //services.ConfigureApplicationCookie(options =>
            //{
            //    // disable automatic challenge (always redirect user when on page)
            //    options.Events.OnRedirectToLogin = (context) =>
            //    {
            //        context.Response.StatusCode = 401;
            //        return Task.CompletedTask;
            //    };

            //    // cookie settings
            //    options.Cookie.HttpOnly = true;
            //    options.Cookie.SameSite = SameSiteMode.Strict;
            //    options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
            //    options.Cookie.Name = "CookieAuthentication";
            //    options.LoginPath = "/login";
            //    options.AccessDeniedPath = "/Forbidden";
            //    options.Cookie.Expiration = TimeSpan.FromDays(10);
            //    options.ExpireTimeSpan = TimeSpan.FromDays(10);
            //});

            //services.Configure<CookiePolicyOptions>(options =>
            //{
            //    // No consent check needed here, change this to TRUE later
            //    options.CheckConsentNeeded = context => true;
            //    options.MinimumSameSitePolicy = SameSiteMode.None;
            //});

            //services.AddSession(options =>
            //{
            //    options.Cookie.IsEssential = true;
            //});
                
            // requires using Microsoft.Extensions.Options
            services.Configure<UserDatabaseSettings>(
                Configuration.GetSection(nameof(UserDatabaseSettings)));

            services.AddSwaggerGen(options =>
                {
                    options.SwaggerDoc("v1", new Info { Title = "User API", Version = "v1" });
                });

            services.AddSingleton<IUserDatabaseSettings>(sp =>
                sp.GetRequiredService<IOptions<UserDatabaseSettings>>().Value);

            services.AddSingleton<UserService>();

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
            services.AddSingleton<IConfiguration>(Configuration);

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            app.UseSwagger();
            // Enable middleware to serve swagger - ui assests(HTML, JS, CSS etc.)
            app.UseSwaggerUI(options =>
            {
                options.SwaggerEndpoint("/swagger/v1/swagger.json", "User API v1");
            }); // URL: /swagger

            app.UseCookiePolicy();
            app.UseAuthentication();

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}
