---
---


# 🛡️ Rollenverwaltung für Admin- und User-Frontend in .NET mit Firebase

Dieses Dokument erklärt, wie man in einer Quiz-Webseite **User** (spielen) und **Admin** (Quizzes erstellen/bearbeiten) trennt.  
Das erfolgt mit **Firebase Authentication + Custom Claims** und einem **einzigen Backend**.

---

## 1. Firebase Setup

### Admin-Claim setzen (einmalig, serverseitig)
```js
// Beispiel mit Firebase Admin SDK
const admin = require("firebase-admin");

admin.auth().setCustomUserClaims(uid, { admin: true });
```

Ab jetzt hat der User ein admin: true Claim im JWT.

## 2. .NET Setup
Authentication konfigurieren (Program.cs)

```cs
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.Authority = "https://securetoken.google.com/YOUR_PROJECT_ID";
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidIssuer = "https://securetoken.google.com/YOUR_PROJECT_ID",
            ValidateAudience = true,
            ValidAudience = "YOUR_PROJECT_ID",
            ValidateLifetime = true
        };
    });

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("AdminOnly", policy =>
        policy.RequireClaim("admin", "true"));
});

builder.Services.AddControllers();

var app = builder.Build();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
```

## 3. Controller-Absicherung

```csharp
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class QuizController : ControllerBase
{
    // Jeder eingeloggte Nutzer darf Quizzes abrufen
    [HttpGet("{id}")]
    [Authorize]
    public IActionResult GetQuiz(int id)
    {
        return Ok($"Quiz {id} geladen");
    }

    // Nur Admin darf Quizzes erstellen
    [HttpPost]
    [Authorize(Policy = "AdminOnly")]
    public IActionResult CreateQuiz([FromBody] string quizData)
    {
        return Ok("Quiz erstellt!");
    }
}
```

## 4. Frontend-Trennung

User-Frontend
Login, Quizzes lösen
Ruft nur die Endpoints ohne AdminOnly-Policy auf
Admin-Frontend
Login mit Admin-Account
Zeigt zusätzliche CRUD-Funktionen
Ruft Endpoints mit AdminOnly auf

## 5. Best Practices

Trennung in Frontends (Admin-UI / User-UI), aber nur ein Backend.

Autorisation immer im Backend prüfen, niemals nur im Frontend.

Defense-in-Depth: auch Admin-Frontend sollte nur Buttons anzeigen, wenn Token → admin: true.