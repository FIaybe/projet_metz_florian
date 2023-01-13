using ApiProjectWeb.Helpers;
using Microsoft.EntityFrameworkCore;
using Model;
using PumaBackend.DependencyInjector;
using Services.Services.Seeding;

var builder = WebApplication.CreateBuilder(args);
var di = new DependencyInjector();
var corsPolicy = "CorsPolicy";

var config = builder.Configuration;
var services = builder.Services;

di.InjectAll(services, config);
services.AddCors(options =>
{
    options.AddPolicy(corsPolicy, builder => builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
});

services.AddControllers();
services.AddAWSLambdaHosting(LambdaEventSource.HttpApi);
services.Configure<AppSettings>(config.GetSection("AppSettings"));
services.AddDbContext<Context>(opt => opt.UseInMemoryDatabase("db"));

services.AddEndpointsApiExplorer();
services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

using (var scope = app.Services.CreateScope())
{
    var clientSeeder = scope.ServiceProvider.GetRequiredService<IClientSeeder>();
    var productSeeder = scope.ServiceProvider.GetRequiredService<IProductSeeder>();
    clientSeeder.Seed();
    productSeeder.Seed();
}

app.UseHttpsRedirection();
app.UseCors(corsPolicy);
app.UseAuthorization();
app.UseMiddleware<JwtMiddleware>();
app.MapControllers();

app.Run();
