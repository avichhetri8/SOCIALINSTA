using DOMAIN;
using MediatR;
using PERSISTANCE;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Activity activity { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                Activity result = await _context.Activities.FindAsync(request.activity.Id);
                result.Title = result.Title ?? request.activity.Title ;
                await _context.SaveChangesAsync();
                return Unit.Value;
            }


        }

    }
}
